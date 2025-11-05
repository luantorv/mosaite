"""
Vector Store para almacenamiento y búsqueda de embeddings.
Utiliza FAISS para indexación eficiente y pickle para persistencia.
"""
import os
import pickle
import numpy as np
from typing import List, Tuple, Optional, Dict, Any
import logging

try:
    import faiss
except ImportError:
    # Si FAISS no está disponible, usar búsqueda por fuerza bruta
    faiss = None

logger = logging.getLogger(__name__)


class VectorStore:
    """
    Almacén de vectores con búsqueda de similitud.
    Soporta FAISS para búsqueda eficiente o fallback a búsqueda por fuerza bruta.
    """
    
    def __init__(self, dimension: int, use_faiss: bool = True):
        """
        Inicializa el vector store.
        
        Args:
            dimension: Dimensión de los vectores de embedding
            use_faiss: Si True y FAISS está disponible, lo usa. Sino, usa fuerza bruta
        """
        self.dimension = dimension
        self.use_faiss = use_faiss and faiss is not None
        
        # Almacenamiento de documentos y metadatos
        self.documents: List[str] = []
        self.metadata: List[Dict[str, Any]] = []
        self.embeddings: List[np.ndarray] = []
        
        # Índice FAISS si está disponible
        self.index = None
        if self.use_faiss:
            self.index = faiss.IndexFlatL2(dimension)
            logger.info("VectorStore inicializado con FAISS")
        else:
            logger.info("VectorStore inicializado con búsqueda por fuerza bruta")
    
    def add_documents(
        self,
        documents: List[str],
        embeddings: List[np.ndarray],
        metadata: Optional[List[Dict[str, Any]]] = None
    ) -> None:
        """
        Añade documentos con sus embeddings al store.
        
        Args:
            documents: Lista de textos/documentos
            embeddings: Lista de vectores de embedding
            metadata: Lista opcional de diccionarios con metadatos
        """
        if len(documents) != len(embeddings):
            raise ValueError("La cantidad de documentos debe coincidir con la de embeddings")
        
        # Validar dimensión
        for emb in embeddings:
            if emb.shape[0] != self.dimension:
                raise ValueError(f"Dimensión incorrecta: esperado {self.dimension}, recibido {emb.shape[0]}")
        
        # Preparar metadatos
        if metadata is None:
            metadata = [{} for _ in documents]
        elif len(metadata) != len(documents):
            raise ValueError("La cantidad de metadatos debe coincidir con la de documentos")
        
        # Agregar a almacenamiento
        self.documents.extend(documents)
        self.embeddings.extend(embeddings)
        self.metadata.extend(metadata)
        
        # Agregar al índice FAISS
        if self.use_faiss:
            embeddings_array = np.array(embeddings).astype('float32')
            self.index.add(embeddings_array)
        
        logger.info(f"Añadidos {len(documents)} documentos al vector store")
    
    def search(
        self,
        query_embedding: np.ndarray,
        k: int = 5
    ) -> List[Tuple[str, float, Dict[str, Any]]]:
        """
        Busca los k documentos más similares al query.
        
        Args:
            query_embedding: Vector de embedding de la consulta
            k: Número de resultados a devolver
        
        Returns:
            Lista de tuplas (documento, distancia, metadata)
        """
        if len(self.documents) == 0:
            logger.warning("Vector store vacío, no hay documentos para buscar")
            return []
        
        # Limitar k al número de documentos disponibles
        k = min(k, len(self.documents))
        
        # Validar dimensión
        if query_embedding.shape[0] != self.dimension:
            raise ValueError(f"Dimensión incorrecta: esperado {self.dimension}, recibido {query_embedding.shape[0]}")
        
        if self.use_faiss:
            # Búsqueda con FAISS
            query_array = np.array([query_embedding]).astype('float32')
            distances, indices = self.index.search(query_array, k)
            
            results = []
            for dist, idx in zip(distances[0], indices[0]):
                results.append((
                    self.documents[idx],
                    float(dist),
                    self.metadata[idx]
                ))
        else:
            # Búsqueda por fuerza bruta (distancia L2)
            embeddings_array = np.array(self.embeddings)
            distances = np.linalg.norm(embeddings_array - query_embedding, axis=1)
            
            # Obtener índices de los k más cercanos
            indices = np.argsort(distances)[:k]
            
            results = []
            for idx in indices:
                results.append((
                    self.documents[idx],
                    float(distances[idx]),
                    self.metadata[idx]
                ))
        
        return results
    
    def save(self, filepath: str) -> None:
        """
        Guarda el vector store en disco.
        
        Args:
            filepath: Ruta donde guardar el store
        """
        os.makedirs(os.path.dirname(filepath) if os.path.dirname(filepath) else '.', exist_ok=True)
        
        data = {
            'dimension': self.dimension,
            'documents': self.documents,
            'embeddings': self.embeddings,
            'metadata': self.metadata,
            'use_faiss': self.use_faiss
        }
        
        # Guardar índice FAISS por separado si existe
        if self.use_faiss and self.index is not None:
            faiss_path = f"{filepath}.faiss"
            faiss.write_index(self.index, faiss_path)
            data['has_faiss_index'] = True
        
        with open(filepath, 'wb') as f:
            pickle.dump(data, f)
        
        logger.info(f"Vector store guardado en {filepath}")
    
    @classmethod
    def load(cls, filepath: str) -> 'VectorStore':
        """
        Carga un vector store desde disco.
        
        Args:
            filepath: Ruta del archivo a cargar
        
        Returns:
            Instancia de VectorStore cargada
        """
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
        
        # Crear instancia
        store = cls(dimension=data['dimension'], use_faiss=data.get('use_faiss', True))
        
        # Restaurar datos
        store.documents = data['documents']
        store.embeddings = data['embeddings']
        store.metadata = data['metadata']
        
        # Cargar índice FAISS si existe
        if data.get('has_faiss_index') and store.use_faiss:
            faiss_path = f"{filepath}.faiss"
            if os.path.exists(faiss_path):
                store.index = faiss.read_index(faiss_path)
        
        logger.info(f"Vector store cargado desde {filepath} con {len(store.documents)} documentos")
        return store
    
    def clear(self) -> None:
        """Limpia todo el contenido del vector store."""
        self.documents = []
        self.embeddings = []
        self.metadata = []
        if self.use_faiss:
            self.index = faiss.IndexFlatL2(self.dimension)
        logger.info("Vector store limpiado")
    
    def __len__(self) -> int:
        """Retorna el número de documentos en el store."""
        return len(self.documents)