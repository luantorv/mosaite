import platform
from pathlib import Path

# --- ATENCIÓN A ESTA LÍNEA ---
# Calculamos la ruta al directorio raíz (mosaite/)
# Path(__file__) es constants.py
# .parent es tui/
# .parent.parent es mosaite/
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Rutas del proyecto
BACKEND_DIR = PROJECT_ROOT / "backend"
FRONTEND_DIR = PROJECT_ROOT / "frontend"
MANUAL_DIR = PROJECT_ROOT / "manual"
ENV_FILE = PROJECT_ROOT / ".env"
CONFIG_FILE = PROJECT_ROOT / ".project_config.json"
CSS_FILE = PROJECT_ROOT / "main.tcss" # Ruta absoluta al CSS

# Configuración de versiones esperadas
REQUIRED_VERSIONS = {
    "texlive": "3.141592653",
    "python": "3.12.0",
    "nodejs": "24.7.0"
}

# Configuración de descarga del modelo LLM
LLM_DOWNLOAD_URL = "https://huggingface.co/unsloth/gemma-3n-E4B-it-GGUF/resolve/main/gemma-3n-E4B-it-Q4_K_M.gguf"
LLM_FILE_NAME = "gemma-3n-E4B-it-Q4_K_M.gguf"
LLM_DEST_DIR = BACKEND_DIR / "services" / "consultorIA" / "core"
LLM_DEST_PATH = LLM_DEST_DIR / LLM_FILE_NAME

# Detección de sistema operativo
IS_WINDOWS = platform.system() == "Windows"
IS_LINUX = platform.system() == "Linux"
IS_MAC = platform.system() == "Darwin"