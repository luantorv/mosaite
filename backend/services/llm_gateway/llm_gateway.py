from typing import Optional, List, Generator, Dict, Any
from .providers import (
    LLMProvider,
    ProviderType,
    ProviderStatus,
    OpenAIProvider,
    AnthropicProvider,
    GoogleProvider,
    LocalProvider
)


class LLMGateway:
    """
    Gateway centralizado para acceso a LLMs.
    Maneja múltiples providers con sistema de fallback automático.
    """
    
    def __init__(self, local_model_path: Optional[str] = None):
        """
        Inicializa el gateway con todos los providers disponibles.
        
        Args:
            local_model_path: Ruta opcional al modelo local
        """
        self.providers: List[LLMProvider] = []
        self.local_model_path = local_model_path
        self._initialize_providers()
    
    def _initialize_providers(self):
        """Inicializa todos los providers y verifica su disponibilidad"""
        print("\n=== Inicializando LLM Gateway ===")
        
        # Intentar inicializar providers de API
        api_providers = [
            ("OpenAI", OpenAIProvider),
            ("Anthropic", AnthropicProvider),
            ("Google", GoogleProvider),
        ]
        
        for name, provider_class in api_providers:
            try:
                provider = provider_class()
                if provider.initialize():
                    self.providers.append(provider)
                    print(f"✓ {name} disponible")
                else:
                    print(f"✗ {name} no disponible: {provider.error_message}")
            except Exception as e:
                print(f"✗ {name} error en inicialización: {e}")
        
        # Intentar inicializar provider local (último recurso)
        try:
            local_provider = LocalProvider(self.local_model_path)
            if local_provider.initialize():
                self.providers.append(local_provider)
                print(f"Modelo local disponible (fallback)")
            else:
                print(f"Modelo local no disponible: {local_provider.error_message}")
        except Exception as e:
            print(f"Modelo local error: {e}")
        
        if not self.providers:
            print("\nADVERTENCIA: No hay providers disponibles")
        else:
            print(f"\nGateway inicializado con {len(self.providers)} provider(s)")
        
        print("=================================\n")
    
    def _get_available_provider(self) -> Optional[LLMProvider]:
        """
        Obtiene el primer provider disponible según prioridad.
        
        Returns:
            Provider disponible o None si no hay ninguno
        """
        for provider in self.providers:
            if provider.status == ProviderStatus.AVAILABLE:
                return provider
            elif provider.status == ProviderStatus.QUOTA_EXCEEDED:
                # Intentar health check por si se renovó la cuota
                if provider.health_check():
                    return provider
        
        return None
    
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.9,
        stream: bool = False,
        preferred_provider: Optional[ProviderType] = None
    ) -> str | Generator[str, None, None]:
        """
        Genera una respuesta usando el mejor provider disponible.
        
        Args:
            user_prompt: El prompt del usuario
            system_prompt: Las instrucciones del sistema
            max_tokens: Máximo de tokens a generar
            temperature: Temperatura para la generación
            top_p: Parámetro top_p
            stream: Si debe retornar un generador
            preferred_provider: Provider preferido (opcional)
        
        Returns:
            Respuesta generada o generador
        
        Raises:
            Exception: Si no hay providers disponibles
        """
        # Si se especifica un provider preferido, intentar usarlo primero
        if preferred_provider:
            for provider in self.providers:
                if (provider.provider_type == preferred_provider and 
                    provider.status == ProviderStatus.AVAILABLE):
                    try:
                        print(f"[Gateway] Usando provider preferido: {provider.provider_type.value}")
                        return provider.generate(
                            user_prompt, system_prompt, max_tokens,
                            temperature, top_p, stream
                        )
                    except Exception as e:
                        print(f"[Gateway] Error con provider preferido: {e}")
                        # Continuar al fallback
                        break
        
        # Fallback: usar el primer provider disponible
        provider = self._get_available_provider()
        
        if not provider:
            raise Exception("No hay providers disponibles. Verifica las API keys o el modelo local.")
        
        try:
            print(f"[Gateway] Usando provider: {provider.provider_type.value}")
            return provider.generate(
                user_prompt, system_prompt, max_tokens,
                temperature, top_p, stream
            )
        except Exception as e:
            # Si falla, intentar con el siguiente provider
            print(f"[Gateway] Error con {provider.provider_type.value}: {e}")
            provider.status = ProviderStatus.ERROR
            
            # Intentar con el siguiente provider disponible
            next_provider = self._get_available_provider()
            if next_provider:
                print(f"[Gateway] Intentando fallback a: {next_provider.provider_type.value}")
                return next_provider.generate(
                    user_prompt, system_prompt, max_tokens,
                    temperature, top_p, stream
                )
            else:
                raise Exception(f"Todos los providers fallaron. Último error: {e}")
    
    def generate_simple(
        self,
        prompt: str,
        max_tokens: int = 200,
        preferred_provider: Optional[ProviderType] = None
    ) -> str:
        """
        Genera una respuesta simple (para casos como consultorIA).
        
        Args:
            prompt: El prompt completo
            max_tokens: Máximo de tokens a generar
            preferred_provider: Provider preferido (opcional)
        
        Returns:
            Respuesta generada
        
        Raises:
            Exception: Si no hay providers disponibles
        """
        # Si se especifica un provider preferido, intentar usarlo primero
        if preferred_provider:
            for provider in self.providers:
                if (provider.provider_type == preferred_provider and 
                    provider.status == ProviderStatus.AVAILABLE):
                    try:
                        print(f"[Gateway] Usando provider preferido: {provider.provider_type.value}")
                        return provider.generate_simple(prompt, max_tokens)
                    except Exception as e:
                        print(f"[Gateway] Error con provider preferido: {e}")
                        break
        
        # Fallback: usar el primer provider disponible
        provider = self._get_available_provider()
        
        if not provider:
            raise Exception("No hay providers disponibles. Verifica las API keys o el modelo local.")
        
        try:
            print(f"[Gateway] Usando provider: {provider.provider_type.value}")
            return provider.generate_simple(prompt, max_tokens)
        except Exception as e:
            print(f"[Gateway] Error con {provider.provider_type.value}: {e}")
            provider.status = ProviderStatus.ERROR
            
            # Intentar con el siguiente provider
            next_provider = self._get_available_provider()
            if next_provider:
                print(f"[Gateway] Intentando fallback a: {next_provider.provider_type.value}")
                return next_provider.generate_simple(prompt, max_tokens)
            else:
                raise Exception(f"Todos los providers fallaron. Último error: {e}")
    
    def get_status(self) -> Dict[str, Any]:
        """
        Obtiene el estado de todos los providers.
        
        Returns:
            Dict con información de estado
        """
        return {
            "total_providers": len(self.providers),
            "available_providers": sum(
                1 for p in self.providers 
                if p.status == ProviderStatus.AVAILABLE
            ),
            "providers": [p.get_status() for p in self.providers]
        }
    
    def health_check_all(self):
        """Ejecuta health check en todos los providers"""
        print("\n=== Health Check de Providers ===")
        for provider in self.providers:
            status = "✓" if provider.health_check() else "✗"
            print(f"{status} {provider.provider_type.value}: {provider.status.value}")
        print("=================================\n")
    
    def shutdown(self):
        """Cierra todos los providers y libera recursos"""
        print("\n=== Cerrando LLM Gateway ===")
        for provider in self.providers:
            try:
                provider.shutdown()
                print(f"✓ {provider.provider_type.value} cerrado")
            except Exception as e:
                print(f"✗ Error cerrando {provider.provider_type.value}: {e}")
        print("============================\n")


# Instancia global del gateway
_gateway_instance: Optional[LLMGateway] = None


def get_gateway(local_model_path: Optional[str] = None) -> LLMGateway:
    """
    Obtiene la instancia singleton del gateway.
    
    Args:
        local_model_path: Ruta al modelo local (solo en primera inicialización)
    
    Returns:
        Instancia del gateway
    """
    global _gateway_instance
    
    if _gateway_instance is None:
        _gateway_instance = LLMGateway(local_model_path)
    
    return _gateway_instance
