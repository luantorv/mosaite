"""
Puente entre la app `chat` y el servicio `consultorIA`.

Genera una consulta SQL a partir de una pregunta en lenguaje natural
(usando consultorIA) y la ejecuta de forma segura (solo lectura / SELECT)
contra la base de datos, devolviendo columnas y filas.
"""
from django.db import connection

# consultorIA vive en backend/services/, que está en sys.path (ver settings.py)
from consultorIA import consultor_service


# Máximo de filas devueltas para evitar respuestas enormes
MAX_ROWS = 500

# Identificadores sensibles que nunca deben consultarse desde lenguaje natural.
# Es una defensa extra: aunque el esquema expuesto no incluye estas columnas,
# bloqueamos cualquier intento explícito de acceder a ellas.
FORBIDDEN_IDENTIFIERS = (
    "password",
    "is_superuser",
    "user_permissions",
    "token_blacklist",
    "outstandingtoken",
    "blacklistedtoken",
)


def _contiene_identificador_prohibido(sql: str) -> bool:
    lowered = sql.lower()
    return any(word in lowered for word in FORBIDDEN_IDENTIFIERS)


def _ejecutar_select(sql: str):
    """
    Ejecuta un SELECT y devuelve (columns, rows, truncated).

    Solo se llega aquí con consultas ya validadas como SELECT por consultorIA.
    El driver sqlite3 solo ejecuta una sentencia por llamada, por lo que no es
    posible encadenar comandos con ';'.
    """
    with connection.cursor() as cursor:
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description] if cursor.description else []
        # Pedimos una fila de más para saber si hubo que truncar
        fetched = cursor.fetchmany(MAX_ROWS + 1)
        truncated = len(fetched) > MAX_ROWS
        rows = [list(row) for row in fetched[:MAX_ROWS]]
    return columns, rows, truncated


def procesar_consulta(pregunta: str) -> dict:
    """
    Genera y ejecuta una consulta SQL a partir de una pregunta en lenguaje natural.

    Returns un dict con:
      - valid (bool)
      - sql (str) — consulta generada (puede venir aunque falle la ejecución)
      - columns (list[str]) — solo si valid
      - rows (list[list]) — solo si valid
      - row_count (int) — solo si valid
      - truncated (bool) — solo si valid
      - error_code (int), error (str) — solo si no es válida
    """
    resultado = consultor_service.generar_sql(pregunta)

    if not resultado.get("valida"):
        return {
            "valid": False,
            "sql": "",
            "error_code": resultado.get("codigo", -1),
            "error": resultado.get(
                "error_usuario", "No se pudo generar una consulta válida."
            ),
        }

    sql = resultado["consulta"].strip().rstrip(";").strip()

    if _contiene_identificador_prohibido(sql):
        return {
            "valid": False,
            "sql": "",
            "error_code": 4,
            "error": "La consulta intenta acceder a información restringida.",
        }

    try:
        columns, rows, truncated = _ejecutar_select(sql)
    except Exception as e:
        return {
            "valid": False,
            "sql": sql,
            "error_code": -2,
            "error": f"La consulta generada no se pudo ejecutar: {str(e)}",
        }

    return {
        "valid": True,
        "sql": sql,
        "columns": columns,
        "rows": rows,
        "row_count": len(rows),
        "truncated": truncated,
    }
