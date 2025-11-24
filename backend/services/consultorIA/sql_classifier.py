"""
Clasificador de consultas SQL usando embeddings
"""
import json
from sentence_transformers import SentenceTransformer, util
from .config import EMBEDDING_MODEL, JSON_PATH


class SQLClassifier:
    """Clasificador que encuentra la consulta SQL más similar a una pregunta"""
    
    def __init__(self):
        self.model = None
        self.ejemplos = []
        self.ej_preguntas = []
        self.ej_embeddings = None
        self.is_loaded = False
    
    def load(self):
        """Carga el modelo de embeddings y los ejemplos"""
        if self.is_loaded:
            return
        
        print(f"[Consultor] Cargando clasificador de embeddings: {EMBEDDING_MODEL}")
        
        # Cargar modelo de embeddings
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        
        # Cargar ejemplos
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            self.ejemplos = json.load(f)
        
        # Generar embeddings de las preguntas de ejemplo
        self.ej_preguntas = [e["question"] for e in self.ejemplos]
        self.ej_embeddings = self.model.encode(self.ej_preguntas)
        
        self.is_loaded = True
        print(f"[Consultor] Clasificador cargado con {len(self.ejemplos)} ejemplos")
    
    def seleccionar_sql(self, pregunta: str) -> str:
        """
        Selecciona la consulta SQL más similar a la pregunta.
        
        Args:
            pregunta: Pregunta en lenguaje natural
        
        Returns:
            Consulta SQL más similar
        """
        if not self.is_loaded:
            self.load()
        
        # Generar embedding de la pregunta
        query_emb = self.model.encode(pregunta)
        
        # Calcular similitud con todos los ejemplos
        scores = util.cos_sim(query_emb, self.ej_embeddings)[0]
        
        # Obtener el índice con mayor similitud
        idx = scores.argmax()
        
        return self.ejemplos[idx]["sql"]


# Instancia global del clasificador
sql_classifier = SQLClassifier()
