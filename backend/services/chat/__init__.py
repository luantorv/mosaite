"""
Servicio RAG modular para Django REST Framework.
Proporciona búsqueda semántica y generación aumentada con retrieval.
"""

from .embedder import Embedder
from .vector_store import VectorStore
from .llm_client import LLMClient
from .rag_service import RAGService
from .config import RAGConfig, setup_rag_service, prepare_embeddings, DEFAULT_CONFIG

__version__ = "1.0.0"

__all__ = [
    'Embedder',
    'VectorStore',
    'LLMClient',
    'RAGService',
    'RAGConfig',
    'setup_rag_service',
    'prepare_embeddings',
    'DEFAULT_CONFIG'
]