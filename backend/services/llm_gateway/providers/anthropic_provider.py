import os
from typing import Generator, Optional
from anthropic import Anthropic, APIError, RateLimitError, AuthenticationError
from .base import LLMProvider, ProviderType, ProviderStatus


class AnthropicProvider(LLMProvider):
    """Provider para Anthropic Claude API"""
    
    def __init__(self, model: str = "claude-3-5-haiku-20241022"):
        super().__init__(ProviderType.ANTHROPIC)
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        self.model = model
        self.client: Optional[Anthropic] = None
    
    def initialize(self) -> bool:
        """Inicializa el cliente de Anthropic"""
        if not self.api_key:
            self.status = ProviderStatus.UNAVAILABLE
            self.error_message = "ANTHROPIC_API_KEY no configurada"
            return False
        
        try:
            self.client = Anthropic(api_key=self.api_key)
            
            # Realizar una llamada de prueba
            if self.health_check():
                self.status = ProviderStatus.AVAILABLE
                self._is_initialized = True
                print(f"[Anthropic] Inicializado correctamente con modelo {self.model}")
                return True
            else:
                return False
                
        except AuthenticationError:
            self.status = ProviderStatus.ERROR
            self.error_message = "API key inválida"
            print(f"[Anthropic] Error: API key inválida")
            return False
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Anthropic] Error en inicialización: {e}")
            return False
    
    def health_check(self) -> bool:
        """Verifica disponibilidad con una llamada mínima"""
        if not self.client:
            return False
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=5,
                messages=[{"role": "user", "content": "test"}]
            )
            self.status = ProviderStatus.AVAILABLE
            self.error_message = None
            return True
            
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            self.error_message = "Cuota excedida"
            print("[Anthropic] Cuota excedida")
            return False
        except AuthenticationError:
            self.status = ProviderStatus.ERROR
            self.error_message = "Error de autenticación"
            return False
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Anthropic] Health check falló: {e}")
            return False
    
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.9,
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """Genera respuesta usando Anthropic API"""
        if not self.client or self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        try:
            if stream:
                return self._generate_stream(
                    user_prompt, system_prompt, max_tokens, temperature, top_p
                )
            else:
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    top_p=top_p,
                    system=system_prompt,
                    messages=[{"role": "user", "content": user_prompt}]
                )
                return response.content[0].text.strip()
                
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de Anthropic excedida")
        except APIError as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            raise Exception(f"Error de Anthropic: {e}")
    
    def _generate_stream(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int,
        temperature: float,
        top_p: float
    ) -> Generator[str, None, None]:
        """Genera respuesta en modo streaming"""
        try:
            with self.client.messages.stream(
                model=self.model,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            ) as stream:
                for text in stream.text_stream:
                    yield text
                    
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            yield "Error: Cuota excedida"
        except Exception as e:
            self.status = ProviderStatus.ERROR
            yield f"Error en streaming: {str(e)}"
    
    def generate_simple(
        self,
        prompt: str,
        max_tokens: int = 200
    ) -> str:
        """Genera respuesta simple para casos como consultorIA"""
        if not self.client or self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=max_tokens,
                system="Sos un asistente breve y directo.",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.content[0].text.strip()
            
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de Anthropic excedida")
        except APIError as e:
            raise Exception(f"Error de Anthropic: {e}")
