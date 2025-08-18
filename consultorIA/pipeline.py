import os.path
import json
from llama_cpp import Llama
from sentence_transformers import SentenceTransformer, util

# Crear variable con la ruta del modelo grande
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "core", "gemma-3n-E4B-it-Q4_K_M.gguf")

# Crear variable con la ruta al JSON de ejemplos
JSON_PATH = os.path.join(BASE_DIR, "examples.json")

# Crear variable con la ruta al TXT de esquema
TXT_PATH = os.path.join(BASE_DIR, "schema.txt")

# CLASIFICADOR:

# instanciamos 
model = SentenceTransformer("all-MiniLM-L6-v2")

# leemos los ejemplos y los guardamos en "ejemplos"
with open(JSON_PATH) as f:
    ejemplos = json.load(f)

# indexar ejemplos
ej_preguntas = [e["question"] for e in ejemplos]
ej_embeddings = model.encode(ej_preguntas)

def cargar_esquema(path="esquema.txt"):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def seleccionar_sql(pregunta):
    """Al pasar una pregunta (str) como parámetro, selecciona entre los ejemplos a su disposición el más parecido."""
    query_emb = model.encode(pregunta)
    scores = util.cos_sim(query_emb, ej_embeddings)[0]
    idx = scores.argmax()
    return ejemplos[idx]["sql"]

llm = Llama(model_path=os.path.realpath(MODEL_PATH),
            n_ctx=2048,
            verbose=False)

def consultar_modelo(mensaje: str) -> str:
    """Hace una consulta al modelo en estilo chat y devuelve solo el texto de respuesta."""

    respuesta = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": "Sosun asistente breve y directo."},
            {"role": "user", "content": mensaje}
        ],
        max_tokens=200
    )

    return respuesta["choices"][0]["message"]["content"]

def generar_sql(pregunta):
    """A partir de la pregunta que ingresa como parámetro:
    1. Con un modelo pequeño se selecciona la pregunta más parecida en una serie de ejemplos de NL -> SQL
    2. Se arma un pequeño prompt con la mejor coincidencia, el esquema de la db y la pregunta original.
    3. Se pasa el prompt al modelo más grande para que ajuste el SQL en caso de ser necesario."""

    # Seleccionar SQL candidata
    sql_candidata = seleccionar_sql(pregunta)

    # Cargar esquema desde txt
    esquema = cargar_esquema(TXT_PATH)

    # Crear el prompt para el modelo grande
    prompt = f"""
    Eres un asistente que corrige y adapta consultas SQL.
    Se te da una pregunta en lenguaje natural, un esquema de base de datos y una consulta SQL candidata.

    Pregunta: {pregunta}

    Esquema:
    {esquema}

    Consulta candidata:
    {sql_candidata}

    Genera una consulta SQL corregida y válida, que responda exactamente la pregunta.
    """

    # Pasarselo al modelo grnade y devolver el resultado
    sql_final = consultar_modelo(prompt)
    return sql_final