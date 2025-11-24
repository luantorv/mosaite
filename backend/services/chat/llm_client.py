"""
Cliente LLM adaptado para usar el LLM Gateway.
Mantiene la misma interfaz que antes para compatibilidad.
"""

from typing import Optional, Generator
from llm_gateway import get_gateway
from .config import (
    LLM_MAX_TOKENS,
    LLM_TEMPERATURE,
    LLM_TOP_P
)


class LLMClient:
    """Cliente para interactuar con LLMs usando el gateway centralizado"""
    
    def __init__(self):
        self.gateway = None
        self.is_loaded = False
        self._stop_generation = False
    
    def load_model(self):
        """Inicializa el gateway (reemplaza la carga del modelo local)"""
        if self.is_loaded:
            return
        
        try:
            print("Inicializando LLM Gateway...")
            self.gateway = get_gateway()
            self.is_loaded = True
            print("LLM Gateway inicializado exitosamente")
        except Exception as e:
            print(f"Error al inicializar LLM Gateway: {e}")
            raise
    
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = LLM_MAX_TOKENS,
        temperature: float = LLM_TEMPERATURE,
        top_p: float = LLM_TOP_P,
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """
        Genera una respuesta del LLM usando el gateway.
        
        Args:
            user_prompt: El prompt del usuario (contexto + pregunta)
            system_prompt: Las instrucciones del sistema (reglas)
            max_tokens: Máximo de tokens a generar
            temperature: Temperatura para la generación
            top_p: Parámetro top_p
            stream: Si True, retorna un generador para streaming
        
        Returns:
            La respuesta generada o un generador
        """
        if not self.is_loaded:
            self.load_model()
        
        self._stop_generation = False
        
        try:
            response = self.gateway.generate(
                user_prompt=user_prompt,
                system_prompt=system_prompt,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                stream=stream
            )
            
            # Si no es streaming, validar que la respuesta no esté vacía
            if not stream:
                if not response or len(response) < 10:
                    return "Lo siento, no pude generar una respuesta apropiada. Por favor, intenta reformular tu pregunta."
            
            return response
            
        except Exception as e:
            print(f"Error en generación del LLM: {e}")
            if stream:
                def error_generator():
                    yield f"Error al generar respuesta: {str(e)}"
                return error_generator()
            else:
                return f"Error al generar respuesta: {str(e)}"
    
    def stop_generation(self):
        """Detiene la generación actual"""
        self._stop_generation = True
        # El gateway maneja esto internamente para cada provider
    
    def unload_model(self):
        """Descarga recursos (cierra el gateway)"""
        if self.gateway is not None:
            print("Cerrando LLM Gateway...")
            self.gateway.shutdown()
            self.gateway = None
            self.is_loaded = False
            print("LLM Gateway cerrado")


# Instancia global del cliente
llm_client = LLMClient()