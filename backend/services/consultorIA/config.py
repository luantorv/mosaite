"""
Configuración del servicio consultorIA
"""
import os
from pathlib import Path

# Rutas base
BASE_DIR = Path(__file__).resolve().parent
JSON_PATH = BASE_DIR / "examples.json"
SCHEMA_PATH = BASE_DIR / "schema.txt"

# Configuración del clasificador de embeddings
EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# Configuración del LLM para generación SQL
LLM_MAX_TOKENS = 200
LLM_TEMPERATURE = 0.7

# System prompt para el LLM
SYSTEM_PROMPT = "Sos un asistente breve y directo."

# Template para el prompt de generación SQL
SQL_GENERATION_TEMPLATE = """Eres un asistente que corrige y adapta consultas SQL.
Se te da una pregunta en lenguaje natural, un esquema de base de datos y una consulta SQL candidata.

Pregunta: {pregunta}

Esquema:
{esquema}

Consulta candidata:
{sql_candidata}

Genera una consulta SQL corregida y válida, que responda exactamente la pregunta."""
