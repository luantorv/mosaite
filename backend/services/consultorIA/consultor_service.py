"""
Servicio principal de consultorIA
"""
from typing import Dict
from pathlib import Path
from .sql_classifier import sql_classifier
from .sql_validator import validar_sql, limpiar_sql
from .llm_client import llm_client
from .config import SCHEMA_PATH, SQL_GENERATION_TEMPLATE


class ConsultorService:
    """Servicio para generar consultas SQL a partir de preguntas en lenguaje natural"""
    
    def __init__(self):
        self._esquema = None
    
    def initialize(self):
        """Inicializa todos los componentes del servicio"""
        print("[Consultor] Inicializando servicio...")
        
        # Cargar clasificador
        sql_classifier.load()
        
        # Cargar LLM
        llm_client.load()
        
        # Cargar esquema
        self._load_schema()
        
        print("[Consultor] Servicio inicializado correctamente")
    
    def _load_schema(self):
        """Carga el esquema de la base de datos"""
        try:
            with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
                self._esquema = f.read()
            print(f"[Consultor] Esquema cargado desde {SCHEMA_PATH}")
        except Exception as e:
            print(f"[Consultor] Error cargando esquema: {e}")
            self._esquema = ""
    
    def generar_sql(self, pregunta: str) -> Dict:
        """
        Genera una consulta SQL a partir de una pregunta en lenguaje natural.
        
        Proceso:
        1. Clasifica la pregunta para encontrar un ejemplo similar
        2. Usa el LLM para ajustar/corregir la consulta SQL
        3. Valida que la consulta sea segura (solo SELECT)
        
        Args:
            pregunta: Pregunta en lenguaje natural
        
        Returns:
            Diccionario con:
                - valida: bool
                - consulta: str (si es válida)
                - codigo: int (código de error si no es válida)
                - error_tecnico: str
                - error_usuario: str
        """
        if not sql_classifier.is_loaded or not llm_client.is_loaded:
            self.initialize()
        
        try:
            # 1. Seleccionar SQL candidata usando el clasificador
            print(f"[Consultor] Clasificando pregunta: {pregunta[:50]}...")
            sql_candidata = sql_classifier.seleccionar_sql(pregunta)
            print(f"[Consultor] SQL candidata: {sql_candidata[:50]}...")
            
            # 2. Crear prompt para el LLM
            prompt = SQL_GENERATION_TEMPLATE.format(
                pregunta=pregunta,
                esquema=self._esquema,
                sql_candidata=sql_candidata
            )
            
            # 3. Generar SQL ajustada con el LLM
            print("[Consultor] Generando SQL con LLM...")
            sql_generada = llm_client.consultar_modelo(prompt)
            
            # 4. Limpiar la respuesta (remover markdown, etc.)
            sql_limpia = limpiar_sql(sql_generada)
            print(f"[Consultor] SQL generada: {sql_limpia[:50]}...")
            
            # 5. Validar que sea segura (solo SELECT)
            resultado = validar_sql(sql_limpia)
            
            if resultado['valida']:
                print("[Consultor] ✓ Consulta válida generada")
            else:
                print(f"[Consultor] ✗ Consulta inválida: {resultado['error_tecnico']}")
            
            return resultado
            
        except Exception as e:
            print(f"[Consultor] Error generando SQL: {e}")
            import traceback
            traceback.print_exc()
            
            return {
                "valida": False,
                "codigo": -1,
                "consulta": "",
                "error_tecnico": f"Error interno: {str(e)}",
                "error_usuario": "Ocurrió un error al procesar tu pregunta. Por favor, intenta reformularla.",
            }
    
    def validar_consulta(self, consulta: str) -> Dict:
        """
        Valida una consulta SQL directamente.
        
        Args:
            consulta: Consulta SQL a validar
        
        Returns:
            Resultado de la validación
        """
        return validar_sql(consulta)
    
    def shutdown(self):
        """Cierra el servicio y libera recursos"""
        print("[Consultor] Cerrando servicio...")
        llm_client.shutdown()


# Instancia global del servicio
consultor_service = ConsultorService()
