import os
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
VECTOR_STORE_DIR = BASE_DIR / "vector_store"
MODEL_PATH = BASE_DIR.parent / "consultorIA" / "core" / "gemma-3n-E4B-it-Q4_K_M.gguf"

# Configuración del modelo de embeddings
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
EMBEDDING_DIMENSION = 384  # Dimensión del modelo paraphrase-multilingual-MiniLM-L12-v2

# Configuración del modelo LLM
LLM_MODEL_PATH = str(MODEL_PATH)
LLM_CONTEXT_SIZE = 2048
LLM_MAX_TOKENS = 512
LLM_TEMPERATURE = 0.7
LLM_TOP_P = 0.9

# Configuración del RAG
CHUNK_SIZE = 500  # Tamaño de los chunks de texto
CHUNK_OVERLAP = 50  # Superposición entre chunks
TOP_K_RESULTS = 3  # Número de resultados a recuperar

# Configuración de FAISS
FAISS_INDEX_FILE = VECTOR_STORE_DIR / "index.faiss"
FAISS_METADATA_FILE = VECTOR_STORE_DIR / "metadata.json"

# Crear directorios si no existen
VECTOR_STORE_DIR.mkdir(exist_ok=True, parents=True)
DATA_DIR.mkdir(exist_ok=True, parents=True)

# Prompt system para el LLM
# Prompt system más corto y directo
SYSTEM_PROMPT = """Eres un asistente de contabilidad. Responde de forma clara y concisa basándote en el contexto.

Contexto:
{context}

Pregunta: {question}

Respuesta (máximo 3 párrafos):"""