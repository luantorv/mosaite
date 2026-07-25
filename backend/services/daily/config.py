"""Configuración del servicio de libros diarios (daily)."""

from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
STORAGE_DIR = BASE_DIR / "storage"

# Plantilla LaTeX del libro diario
LEDGER_TEMPLATE = TEMPLATES_DIR / "libro_diario.tex"

# Índice de metadatos de los libros diarios almacenados
INDEX_FILE = STORAGE_DIR / "index.json"

# Prefijo de los archivos PDF generados: libro_diario_<fecha>.pdf
PDF_PREFIX = "libro_diario"

# Símbolo de moneda mostrado en el PDF (se inserta como LaTeX escapado)
CURRENCY_SYMBOL = r"\$"

# Crear los directorios necesarios si no existen
TEMPLATES_DIR.mkdir(parents=True, exist_ok=True)
STORAGE_DIR.mkdir(parents=True, exist_ok=True)
