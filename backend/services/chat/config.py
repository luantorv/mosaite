"""
Módulo de configuración y setup para el servicio RAG.
Proporciona funciones helper para inicializar y configurar el sistema.
"""
import os
import logging
from typing import Optional
from .embedder import Embedder
from .llm_client import LLMClient
from .rag_service import RAGService

logger = logging.getLogger(__name__)


class RAGConfig:
    """
    Configuración para el servicio RAG.
    """
    
    def __init__(
        self,
        # Configuración del modelo de embeddings
        embedding_model: str = "all-MiniLM-L6-v2",
        
        # Configuración del LLM
        llm_model_path: Optional[str] = None,
        llm_n_ctx: int = 2048,
        llm_n_threads: Optional[int] = None,
        llm_n_gpu_layers: int = 0,
        
        # Configuración del vector store
        vector_store_path: Optional[str] = None,
        use_faiss: bool = True,
        
        # Configuración de logging
        log_level: str = "INFO"
    ):
        """
        Inicializa la configuración del RAG.
        
        Args:
            embedding_model: Nombre del modelo de sentence-transformers
            llm_model_path: Ruta al archivo .gguf del LLM
            llm_n_ctx: Tamaño del contexto del LLM
            llm_n_threads: Threads CPU para el LLM (None = auto)
            llm_n_gpu_layers: Capas del LLM a cargar en GPU
            vector_store_path: Ruta donde guardar/cargar el vector store
            use_faiss: Si usar FAISS para indexación (requiere instalación)
            log_level: Nivel de logging (DEBUG, INFO, WARNING, ERROR)
        """
        self.embedding_model = embedding_model
        self.llm_model_path = llm_model_path
        self.llm_n_ctx = llm_n_ctx
        self.llm_n_threads = llm_n_threads
        self.llm_n_gpu_layers = llm_n_gpu_layers
        self.vector_store_path = vector_store_path
        self.use_faiss = use_faiss
        self.log_level = log_level
        
        # Configurar logging
        logging.basicConfig(
            level=getattr(logging, log_level.upper()),
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    
    def validate(self) -> None:
        """
        Valida la configuración.
        
        Raises:
            ValueError: Si la configuración es inválida
        """
        if self.llm_model_path and not os.path.exists(self.llm_model_path):
            raise ValueError(f"Modelo LLM no encontrado: {self.llm_model_path}")
        
        if self.vector_store_path:
            store_dir = os.path.dirname(self.vector_store_path)
            if store_dir and not os.path.exists(store_dir):
                os.makedirs(store_dir, exist_ok=True)
                logger.info(f"Directorio creado para vector store: {store_dir}")


def setup_rag_service(config: RAGConfig) -> RAGService:
    """
    Configura e inicializa el servicio RAG completo.
    
    Args:
        config: Objeto de configuración RAGConfig
    
    Returns:
        Instancia configurada de RAGService
    
    Raises:
        ValueError: Si falta configuración requerida
    """
    logger.info("Iniciando setup del servicio RAG...")
    
    # Validar configuración
    config.validate()
    
    # 1. Inicializar embedder
    logger.info(f"Inicializando embedder con modelo: {config.embedding_model}")
    embedder = Embedder(model_name=config.embedding_model)
    
    # 2. Inicializar LLM client
    if not config.llm_model_path:
        raise ValueError("Se requiere llm_model_path en la configuración")
    
    logger.info(f"Inicializando LLM desde: {config.llm_model_path}")
    llm_client = LLMClient(
        model_path=config.llm_model_path,
        n_ctx=config.llm_n_ctx,
        n_threads=config.llm_n_threads,
        n_gpu_layers=config.llm_n_gpu_layers
    )
    
    # 3. Cargar o crear vector store
    vector_store = None
    if config.vector_store_path and os.path.exists(config.vector_store_path):
        logger.info(f"Cargando vector store existente desde: {config.vector_store_path}")
        try:
            from .vector_store import VectorStore
            vector_store = VectorStore.load(config.vector_store_path)
        except Exception as e:
            logger.warning(f"No se pudo cargar vector store: {e}. Creando uno nuevo.")
            vector_store = None
    
    # 4. Crear servicio RAG
    rag_service = RAGService(
        embedder=embedder,
        llm_client=llm_client,
        vector_store=vector_store
    )
    
    logger.info("Servicio RAG configurado exitosamente")
    logger.info(f"Estadísticas: {rag_service.get_stats()}")
    
    return rag_service


def prepare_embeddings(
    documents: list,
    config: RAGConfig,
    save_after: bool = True
) -> RAGService:
    """
    Helper para preparar embeddings de documentos.
    Útil para pre-procesar documentos antes de deployment.
    
    Args:
        documents: Lista de documentos a embedear
        config: Configuración del RAG
        save_after: Si guardar el vector store después de procesar
    
    Returns:
        Servicio RAG con documentos indexados
    """
    logger.info(f"Preparando embeddings para {len(documents)} documentos...")
    
    # Setup del servicio
    rag_service = setup_rag_service(config)
    
    # Añadir documentos
    rag_service.add_documents(documents)
    
    # Guardar si se especifica
    if save_after and config.vector_store_path:
        rag_service.save(config.vector_store_path)
        logger.info(f"Embeddings guardados en: {config.vector_store_path}")
    
    return rag_service


# Configuración por defecto para desarrollo
DEFAULT_CONFIG = RAGConfig(
    embedding_model="all-MiniLM-L6-v2",
    vector_store_path="./data/rag_vector_store.pkl",
    use_faiss=False,  # Usar False si FAISS no está instalado
    log_level="INFO"
)