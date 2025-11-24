from sentence_transformers import SentenceTransformer
from typing import List, Union
import numpy as np
from .config import EMBEDDING_MODEL, EMBEDDING_DIMENSION


class Embedder:
    """Clase para generar embeddings de texto usando sentence-transformers"""
    
    def __init__(self):
        self.model = None
        self.is_loaded = False
    
    def load_model(self):
        """Carga el modelo de embeddings"""
        if self.is_loaded:
            return
        
        try:
            print(f"Cargando modelo de embeddings: {EMBEDDING_MODEL}")
            self.model = SentenceTransformer(EMBEDDING_MODEL)
            self.is_loaded = True
            print("Modelo de embeddings cargado exitosamente")
        except Exception as e:
            print(f"Error al cargar modelo de embeddings: {e}")
            raise
    
    def embed_text(self, text: str) -> np.ndarray:
        """
        Genera embedding para un texto
        
        Args:
            text: Texto a embedear
        
        Returns:
            Embedding como numpy array
        """
        if not self.is_loaded:
            self.load_model()
        
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding
    
    def embed_texts(self, texts: List[str]) -> np.ndarray:
        """
        Genera embeddings para múltiples textos
        
        Args:
            texts: Lista de textos
        
        Returns:
            Array de embeddings
        """
        if not self.is_loaded:
            self.load_model()
        
        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            show_progress_bar=True,
            batch_size=32
        )
        return embeddings
    
    def get_embedding_dimension(self) -> int:
        """Retorna la dimensión del embedding"""
        return EMBEDDING_DIMENSION


# Instancia global del embedder
embedder = Embedder()