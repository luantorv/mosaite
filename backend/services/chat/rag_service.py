"""
Servicio principal RAG que integra embeddings, vector store y LLM.
Proporciona una interfaz unificada para indexar documentos y hacer consultas.
"""
import logging
from typing import List, Dict, Any, Optional, Tuple
from .embedder import Embedder
from .vector_store import VectorStore
from .llm_client import LLMClient

logger = logging.getLogger(__name__)


class RAGService:
    """
    Servicio completo de RAG (Retrieval-Augmented Generation).
    Combina búsqueda semántica con generación de lenguaje.
    """
    
    def __init__(
        self,
        embedder: Embedder,
        llm_client: LLMClient,
        vector_store: Optional[VectorStore] = None
    ):
        """
        Inicializa el servicio RAG.
        
        Args:
            embedder: Instancia de Embedder para generar embeddings
            llm_client: Instancia de LLMClient para generar respuestas
            vector_store: VectorStore opcional (se crea uno nuevo si no se provee)
        """
        self.embedder = embedder
        self.llm_client = llm_client
        
        if vector_store is None:
            self.vector_store = VectorStore(dimension=embedder.get_dimension())
        else:
            self.vector_store = vector_store
        
        logger.info("RAGService inicializado")
    
    def add_documents(
        self,
        documents: List[str],
        metadata: Optional[List[Dict[str, Any]]] = None,
        batch_size: int = 32
    ) -> None:
        """
        Añade documentos al índice RAG.
        
        Args:
            documents: Lista de textos/documentos a indexar
            metadata: Lista opcional de metadatos para cada documento
            batch_size: Tamaño del batch para procesar embeddings
        """
        if not documents:
            logger.warning("No se proporcionaron documentos para añadir")
            return
        
        logger.info(f"Procesando {len(documents)} documentos...")
        
        # Procesar en batches para eficiencia
        all_embeddings = []
        for i in range(0, len(documents), batch_size):
            batch = documents[i:i + batch_size]
            embeddings = self.embedder.embed(batch)
            all_embeddings.extend(embeddings)
        
        # Añadir al vector store
        self.vector_store.add_documents(documents, all_embeddings, metadata)
        logger.info(f"Añadidos {len(documents)} documentos al índice")
    
    def query(
        self,
        query: str,
        top_k: int = 3,
        max_tokens: int = 512,
        temperature: float = 0.7,
        return_sources: bool = False,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Realiza una consulta RAG completa.
        
        Args:
            query: Pregunta del usuario
            top_k: Número de documentos relevantes a recuperar
            max_tokens: Máximo de tokens en la respuesta
            temperature: Temperatura para la generación
            return_sources: Si incluir documentos fuente en la respuesta
            system_prompt: Prompt de sistema personalizado
        
        Returns:
            Diccionario con la respuesta y opcionalmente las fuentes
        """
        if len(self.vector_store) == 0:
            logger.warning("Vector store vacío, no hay documentos indexados")
            return {
                'answer': "No hay documentos indexados en el sistema. Por favor, añade documentos primero.",
                'sources': [] if return_sources else None
            }
        
        # 1. Generar embedding de la consulta
        logger.debug(f"Generando embedding para query: {query[:100]}...")
        query_embedding = self.embedder.embed(query)
        
        # 2. Buscar documentos relevantes
        logger.debug(f"Buscando {top_k} documentos relevantes...")
        results = self.vector_store.search(query_embedding, k=top_k)
        
        # 3. Construir contexto
        context_parts = []
        sources = []
        
        for idx, (doc, distance, meta) in enumerate(results, 1):
            context_parts.append(f"[Documento {idx}]\n{doc}")
            if return_sources:
                sources.append({
                    'document': doc,
                    'distance': distance,
                    'metadata': meta
                })
        
        context = "\n\n".join(context_parts)
        
        # 4. Generar respuesta con el LLM
        logger.debug("Generando respuesta con LLM...")
        answer = self.llm_client.generate_with_context(
            query=query,
            context=context,
            system_prompt=system_prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
        
        # 5. Retornar resultado
        result = {'answer': answer}
        if return_sources:
            result['sources'] = sources
        
        return result
    
    def save(self, vector_store_path: str) -> None:
        """
        Guarda el vector store en disco.
        
        Args:
            vector_store_path: Ruta donde guardar el vector store
        """
        self.vector_store.save(vector_store_path)
        logger.info(f"RAG state guardado en {vector_store_path}")
    
    @classmethod
    def load(
        cls,
        vector_store_path: str,
        embedder: Embedder,
        llm_client: LLMClient
    ) -> 'RAGService':
        """
        Carga un RAGService desde un vector store guardado.
        
        Args:
            vector_store_path: Ruta del vector store guardado
            embedder: Instancia de Embedder
            llm_client: Instancia de LLMClient
        
        Returns:
            Nueva instancia de RAGService con el store cargado
        """
        vector_store = VectorStore.load(vector_store_path)
        service = cls(embedder, llm_client, vector_store)
        logger.info(f"RAGService cargado desde {vector_store_path}")
        return service
    
    def clear(self) -> None:
        """Limpia todos los documentos del índice."""
        self.vector_store.clear()
        logger.info("Índice RAG limpiado")
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Obtiene estadísticas del servicio RAG.
        
        Returns:
            Diccionario con estadísticas
        """
        return {
            'total_documents': len(self.vector_store),
            'embedding_dimension': self.embedder.get_dimension(),
            'embedding_model': self.embedder.model_name,
            'llm_model_path': self.llm_client.model_path,
            'uses_faiss': self.vector_store.use_faiss
        }