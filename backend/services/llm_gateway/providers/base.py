from abc import ABC, abstractmethod
from typing import Optional, Generator, Dict, Any
from enum import Enum


class ProviderType(Enum):
    """Tipos de providers disponibles"""
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    GOOGLE = "google"
    LOCAL = "local"


class ProviderStatus(Enum):
    """Estados posibles de un provider"""
    AVAILABLE = "available"
    UNAVAILABLE = "unavailable"
    ERROR = "error"
    QUOTA_EXCEEDED = "quota_exceeded"


class LLMProvider(ABC):
    """Clase base abstracta para todos los providers de LLM"""
    
    def __init__(self, provider_type: ProviderType):
        self.provider_type = provider_type
        self.status = ProviderStatus.UNAVAILABLE
        self.error_message: Optional[str] = None
        self._is_initialized = False
    
    @abstractmethod
    def initialize(self) -> bool:
        """
        Inicializa el provider (carga modelo, verifica API keys, etc.)
        
        Returns:
            bool: True si la inicialización fue exitosa
        """
        pass
    
    @abstractmethod
    def health_check(self) -> bool:
        """
        Verifica si el provider está disponible y funcionando
        
        Returns:
            bool: True si el provider está disponible
        """
        pass
    
    @abstractmethod
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.9,
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """
        Genera una respuesta del LLM
        
        Args:
            user_prompt: El prompt del usuario
            system_prompt: Las instrucciones del sistema
            max_tokens: Máximo de tokens a generar
            temperature: Temperatura para la generación
            top_p: Parámetro top_p para la generación
            stream: Si debe retornar un generador (streaming)
        
        Returns:
            str o Generator: La respuesta generada
        """
        pass
    
    @abstractmethod
    def generate_simple(
        self,
        prompt: str,
        max_tokens: int = 200
    ) -> str:
        """
        Genera una respuesta simple (para casos como consultorIA)
        
        Args:
            prompt: El prompt completo
            max_tokens: Máximo de tokens a generar
        
        Returns:
            str: La respuesta generada
        """
        pass
    
    def get_status(self) -> Dict[str, Any]:
        """
        Obtiene el estado actual del provider
        
        Returns:
            Dict con información del estado
        """
        return {
            "provider": self.provider_type.value,
            "status": self.status.value,
            "is_initialized": self._is_initialized,
            "error_message": self.error_message
        }
    
    def shutdown(self):
        """Limpia recursos del provider"""
        pass
