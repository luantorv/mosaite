import faiss
import numpy as np
import json
from pathlib import Path
from typing import List, Dict, Tuple
from .config import (
    FAISS_INDEX_FILE,
    FAISS_METADATA_FILE,
    EMBEDDING_DIMENSION,
    DATA_DIR,
    CHUNK_SIZE,
    CHUNK_OVERLAP
)
from .embedder import embedder


class VectorStore:
    """Almacén de vectores usando FAISS"""
    
    def __init__(self):
        self.index = None
        self.metadata: List[Dict] = []
        self.is_initialized = False
    
    def initialize(self):
        """Inicializa el índice FAISS"""
        if self.is_initialized:
            return
    
        # Cargar índice existente o crear uno nuevo
        if FAISS_INDEX_FILE.exists() and FAISS_METADATA_FILE.exists():
            print("Cargando índice existente...")
            self.load()
        else:
            print("No se encontró índice existente, creando uno nuevo...")
            self._create_new_index()
            # Cargar documentos automáticamente si el índice está vacío
            if self.index.ntotal == 0:
                print("Índice vacío, cargando documentos automáticamente...")
                self.load_documents_from_directory()
    
        self.is_initialized = True
    
    def _create_new_index(self):
        """Crea un nuevo índice FAISS"""
        print("Creando nuevo índice FAISS")
        # Usar IndexFlatL2 para búsqueda exacta con distancia L2
        self.index = faiss.IndexFlatL2(EMBEDDING_DIMENSION)
        self.metadata = []
    
    def _chunk_text(self, text: str, chunk_size: int, overlap: int) -> List[str]:
        """Divide el texto en chunks con superposición"""
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            end = start + chunk_size
            chunk = text[start:end]
            
            # Solo agregar chunks que tengan contenido significativo
            if len(chunk.strip()) > 50:  # Mínimo 50 caracteres
                chunks.append(chunk.strip())
            
            start += chunk_size - overlap
        
        return chunks
    
    def load_documents_from_directory(self):
        """Carga y procesa todos los documentos del directorio data"""
        print(f"Cargando documentos desde: {DATA_DIR}")
        
        all_chunks = []
        all_metadata = []
        
        # Buscar todos los archivos .md y .txt
        for file_path in DATA_DIR.glob("**/*"):
            if file_path.suffix.lower() in ['.md', '.txt']:
                print(f"Procesando: {file_path.name}")
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Dividir en chunks
                    chunks = self._chunk_text(content, CHUNK_SIZE, CHUNK_OVERLAP)
                    
                    # Crear metadata para cada chunk
                    for i, chunk in enumerate(chunks):
                        all_chunks.append(chunk)
                        all_metadata.append({
                            'source': file_path.name,
                            'chunk_id': i,
                            'total_chunks': len(chunks),
                            'text': chunk
                        })
                    
                    print(f"  - Generados {len(chunks)} chunks")
                
                except Exception as e:
                    print(f"Error procesando {file_path.name}: {e}")
        
        if not all_chunks:
            print("ADVERTENCIA: No se encontraron documentos para indexar")
            return
        
        print(f"\nTotal de chunks a indexar: {len(all_chunks)}")
        
        # Generar embeddings
        print("Generando embeddings...")
        embeddings = embedder.embed_texts(all_chunks)
        
        # Agregar al índice
        self.index.add(embeddings)
        self.metadata = all_metadata
        
        # Guardar
        self.save()
        
        print(f"Índice creado con {len(all_chunks)} chunks")
    
    def search(self, query: str, k: int = 3) -> List[Dict]:
        """
        Busca en el vector store
        
        Args:
            query: Query de búsqueda
            k: Número de resultados a retornar
        
        Returns:
            Lista de documentos relevantes con metadata
        """
        if not self.is_initialized:
            self.initialize()
        
        if self.index.ntotal == 0:
            print("Índice vacío, cargando documentos...")
            self.load_documents_from_directory()
        
        # Generar embedding de la query
        query_embedding = embedder.embed_text(query)
        query_embedding = np.array([query_embedding])
        
        # Buscar en el índice
        distances, indices = self.index.search(query_embedding, k)
        
        # Construir resultados
        results = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.metadata):
                result = self.metadata[idx].copy()
                result['distance'] = float(distances[0][i])
                result['similarity'] = 1 / (1 + result['distance'])  # Convertir a similarity
                results.append(result)
        
        return results
    
    def save(self):
        """Guarda el índice y metadata en disco"""
        try:
            # Guardar índice FAISS
            faiss.write_index(self.index, str(FAISS_INDEX_FILE))
            
            # Guardar metadata
            with open(FAISS_METADATA_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.metadata, f, ensure_ascii=False, indent=2)
            
            print(f"Índice guardado en: {FAISS_INDEX_FILE}")
        except Exception as e:
            print(f"Error guardando índice: {e}")
            raise
    
    def load(self):
        """Carga el índice y metadata desde disco"""
        try:
            # Cargar índice FAISS
            self.index = faiss.read_index(str(FAISS_INDEX_FILE))
            
            # Cargar metadata
            with open(FAISS_METADATA_FILE, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)
            
            print(f"Índice cargado: {self.index.ntotal} vectores")
        except Exception as e:
            print(f"Error cargando índice: {e}")
            self._create_new_index()
    
    def rebuild(self):
        """Reconstruye el índice desde cero"""
        print("Reconstruyendo índice...")
        self._create_new_index()
        self.load_documents_from_directory()
    
    def get_stats(self) -> Dict:
        """Retorna estadísticas del índice"""
        if not self.is_initialized:
            self.initialize()
        
        return {
            'total_vectors': self.index.ntotal if self.index else 0,
            'total_documents': len(set(m['source'] for m in self.metadata)),
            'embedding_dimension': EMBEDDING_DIMENSION
        }


# Instancia global del vector store
vector_store = VectorStore()