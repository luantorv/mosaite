import os
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
VECTOR_STORE_DIR = BASE_DIR / "vector_store"

# Configuración del modelo de embeddings
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384  # Dimensión del modelo all-MiniLM-L6-v2

# Configuración del modelo LLM
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
# ESTE ES EL NUEVO SYSTEM_PROMPT (SOLO REGLAS)
SYSTEM_PROMPT = """Tu rol es ser un asistente de contabilidad experto.
Tu tarea es responder la "Pregunta" basándote ESTRICTA Y ÚNICAMENTE en el "Contexto" proporcionado.

Instrucciones prioritarias:
1.  **Tu objetivo es responder.** Esfuérzate al máximo para sintetizar una respuesta completa y concisa (máximo 3 párrafos) usando el contenido del "Contexto".
2.  **Analiza y sintetiza:** Busca la respuesta aunque la pregunta y el contexto usen sinónimos o requieran inferencia simple (conexión de ideas). Tu respuesta debe ser profesional y directa.
3.  **No uses conocimiento previo.** Toda tu respuesta debe originarse del texto del "Contexto".
4.  **REGLA DE ESCAPE (Último Recurso):** Si, y solo si, la respuesta es IMPOSIBLE de deducir del contexto, debes responder ÚNICAMENTE: "La información solicitada no se encuentra en el contexto proporcionado." Evita esta frase si puedes responder.
5.  No pidas más contexto al usuario.
6.  Ve directamente a la respuesta. No saludes, no te despidas, ni añadas meta-comentarios."""

# NUEVA VARIABLE: Plantilla para los datos del usuario
USER_PROMPT_TEMPLATE = """Contexto:
{context}

Pregunta: {question}"""