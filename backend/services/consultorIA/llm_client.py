"""
Cliente LLM para consultorIA usando el gateway
"""
from llm_gateway import get_gateway
from .config import LLM_MAX_TOKENS, SYSTEM_PROMPT


class LLMClient:
    """Cliente LLM que usa el gateway para generar consultas SQL"""
    
    def __init__(self):
        self.gateway = None
        self.is_loaded = False
    
    def load(self):
        """Inicializa el gateway"""
        if self.is_loaded:
            return
        
        try:
            print("[Consultor] Inicializando gateway LLM...")
            self.gateway = get_gateway()
            self.is_loaded = True
            print("[Consultor] Gateway LLM inicializado")
        except Exception as e:
            print(f"[Consultor] Error al inicializar gateway: {e}")
            raise
    
    def consultar_modelo(self, mensaje: str, max_tokens: int = LLM_MAX_TOKENS) -> str:
        """
        Hace una consulta al modelo para generar/corregir SQL.
        
        Args:
            mensaje: El prompt completo con contexto
            max_tokens: Máximo de tokens a generar
        
        Returns:
            Respuesta del modelo
        """
        if not self.is_loaded:
            self.load()
        
        try:
            # Usar generate_simple del gateway
            response = self.gateway.generate_simple(
                prompt=mensaje,
                max_tokens=max_tokens
            )
            return response
            
        except Exception as e:
            error_msg = f"Error al consultar el modelo: {str(e)}"
            print(f"[Consultor] {error_msg}")
            return error_msg
    
    def shutdown(self):
        """Cierra el gateway"""
        if self.gateway is not None:
            print("[Consultor] Cerrando gateway...")
            self.gateway.shutdown()
            self.gateway = None
            self.is_loaded = False


# Instancia global del cliente
llm_client = LLMClient()
