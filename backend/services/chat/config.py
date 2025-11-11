import os
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
VECTOR_STORE_DIR = BASE_DIR / "vector_store"
MODEL_PATH = BASE_DIR.parent / "consultorIA" / "core" / "Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf"

# Configuración del modelo de embeddings
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384  # Dimensión del modelo all-MiniLM-L6-v2

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
SYSTEM_PROMPT = """Tu rol es ser un asistente de contabilidad experto.
Tu tarea es responder la "Pregunta" basándote ESTRICTA Y ÚNICAMENTE en el "Contexto" proporcionado.

Sigue estas reglas AL PIE DE LA LETRA:
1.  **No uses conocimiento previo.** Toda tu respuesta debe originarse del texto del "Contexto".
2.  **Analiza la pregunta y el contexto cuidadosamente.** La respuesta puede estar en el contexto aunque use palabras diferentes (sinónimos) a las de la pregunta. Esfuérzate por encontrar la conexión.
3.  **No inventes información.** Si la respuesta NO se puede deducir de ninguna manera del contexto, y solo en ese caso, responde exactamente: "La información solicitada no se encuentra en el contexto proporcionado."
4.  **No pidas más contexto al usuario.**
5.  Responde de forma profesional, clara y concisa (máximo 3 párrafos).
6.  **Ve directamente a la respuesta.** No saludes, no te despidas, ni añadas comentarios (ej. "Aquí tienes la respuesta...").

Contexto:
{context}

Pregunta: {question}

Respuesta:"""