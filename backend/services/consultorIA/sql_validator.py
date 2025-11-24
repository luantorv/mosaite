"""
Validador de consultas SQL
"""
import re
from typing import Dict


def limpiar_sql(consulta: str) -> str:
    """
    Limpia bloques de código estilo Markdown (```sql ... ```).
    
    Args:
        consulta: Consulta SQL potencialmente con markdown
    
    Returns:
        Consulta SQL limpia
    """
    # Elimina triple backticks con o sin "sql"
    consulta = re.sub(r"```sql\s*", "", consulta, flags=re.IGNORECASE)
    consulta = consulta.replace("```", "")
    return consulta.strip()


def validar_sql(consulta: str) -> Dict:
    """
    Valida que la consulta SQL solo sea de tipo SELECT.
    
    Args:
        consulta: Consulta SQL a validar
    
    Returns:
        Diccionario con:
            - valida: bool - Si la consulta es válida
            - consulta: str - Consulta limpia (si es válida)
            - codigo: int - Código de error (si no es válida)
            - error_tecnico: str - Descripción técnica del error
            - error_usuario: str - Mensaje amigable para el usuario
    """
    consulta_limpia = limpiar_sql(consulta).lower()
    
    # Patrones prohibidos
    patrones_prohibidos = {
        0: (
            r"^\s*(create|alter)\b",
            "Se detectó un intento de crear o alterar la base de datos."
        ),
        1: (
            r"^\s*(update|insert)\b",
            "Se detectó un intento de insertar o modificar datos."
        ),
        2: (
            r"^\s*(delete|drop)\b",
            "Se detectó un intento de borrar información o tablas."
        )
    }
    
    # Verificar patrones prohibidos
    for codigo_error, (patron, descripcion) in patrones_prohibidos.items():
        if re.match(patron, consulta_limpia):
            return {
                "valida": False,
                "codigo": codigo_error,
                "consulta": "",
                "error_tecnico": descripcion,
                "error_usuario": "Solo puedes consultar información con SELECT, no modificar la base de datos.",
            }
    
    # Verificar que comience con SELECT
    if not consulta_limpia.startswith("select"):
        return {
            "valida": False,
            "codigo": 3,
            "consulta": "",
            "error_tecnico": "La consulta no comienza con SELECT.",
            "error_usuario": "Solo se permiten consultas de lectura (SELECT).",
        }
    
    # Consulta válida
    return {
        "valida": True,
        "codigo": -1,
        "consulta": limpiar_sql(consulta),
        "error_tecnico": "",
        "error_usuario": ""
    }
