import os.path
from llama_cpp import Llama

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "core", "gemma-3n-E4B-it-Q4_K_M.gguf")


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

