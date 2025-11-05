"""
Módulo de embeddings usando sentence-transformers.
Proporciona una interfaz simple para generar embeddings de textos.
"""
import numpy as np
from typing import List, Union
import logging
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)


class Embedder:
    """
    Clase para generar embeddings de texto usando sentence-transformers.
    """
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Inicializa el embedder con un modelo específico.
        
        Args:
            model_name: Nombre del modelo de sentence-transformers a usar.
                       Por defecto usa 'all-MiniLM-L6-v2' (ligero y eficiente).
        """
        logger.info(f"Cargando modelo de embeddings: {model_name}")
        self.model = SentenceTransformer(model_name)
        self.model_name = model_name
        self.dimension = self.model.get_sentence_embedding_dimension()
        logger.info(f"Modelo cargado. Dimensión de embeddings: {self.dimension}")
    
    def embed(self, text: Union[str, List[str]]) -> Union[np.ndarray, List[np.ndarray]]:
        """
        Genera embeddings para uno o más textos.
        
        Args:
            text: Un texto o lista de textos para embedear
        
        Returns:
            Un array numpy o lista de arrays con los embeddings
        """
        is_single = isinstance(text, str)
        texts = [text] if is_single else text
        
        # Generar embeddings
        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            show_progress_bar=len(texts) > 10  # Mostrar barra solo para lotes grandes
        )
        
        # Retornar formato apropiado
        if is_single:
            return embeddings[0]
        else:
            return [emb for emb in embeddings]
    
    def get_dimension(self) -> int:
        """Retorna la dimensión de los embeddings del modelo."""
        return self.dimension