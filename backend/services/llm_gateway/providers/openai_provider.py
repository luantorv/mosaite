import os
from typing import Generator, Optional
from openai import OpenAI, OpenAIError, RateLimitError, AuthenticationError
from .base import LLMProvider, ProviderType, ProviderStatus


class OpenAIProvider(LLMProvider):
    """Provider para OpenAI API"""
    
    def __init__(self, model: str = "gpt-4o-mini"):
        super().__init__(ProviderType.OPENAI)
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.model = model
        self.client: Optional[OpenAI] = None
    
    def initialize(self) -> bool:
        """Inicializa el cliente de OpenAI"""
        if not self.api_key:
            self.status = ProviderStatus.UNAVAILABLE
            self.error_message = "OPENAI_API_KEY no configurada"
            return False
        
        try:
            self.client = OpenAI(api_key=self.api_key)
            
            # Realizar una llamada de prueba simple
            if self.health_check():
                self.status = ProviderStatus.AVAILABLE
                self._is_initialized = True
                print(f"[OpenAI] Inicializado correctamente con modelo {self.model}")
                return True
            else:
                return False
                
        except AuthenticationError:
            self.status = ProviderStatus.ERROR
            self.error_message = "API key inválida"
            print(f"[OpenAI] Error: API key inválida")
            return False
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[OpenAI] Error en inicialización: {e}")
            return False
    
    def health_check(self) -> bool:
        """Verifica disponibilidad con una llamada mínima"""
        if not self.client:
            return False
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": "test"}],
                max_tokens=5
            )
            self.status = ProviderStatus.AVAILABLE
            self.error_message = None
            return True
            
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            self.error_message = "Cuota excedida"
            print("[OpenAI] Cuota excedida")
            return False
        except AuthenticationError:
            self.status = ProviderStatus.ERROR
            self.error_message = "Error de autenticación"
            return False
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[OpenAI] Health check falló: {e}")
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
        """Genera respuesta usando OpenAI API"""
        if not self.client or self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        try:
            if stream:
                return self._generate_stream(messages, max_tokens, temperature, top_p)
            else:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    top_p=top_p
                )
                return response.choices[0].message.content.strip()
                
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de OpenAI excedida")
        except OpenAIError as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            raise Exception(f"Error de OpenAI: {e}")
    
    def _generate_stream(
        self,
        messages: list,
        max_tokens: int,
        temperature: float,
        top_p: float
    ) -> Generator[str, None, None]:
        """Genera respuesta en modo streaming"""
        try:
            stream = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
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
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Sos un asistente breve y directo."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens
            )
            return response.choices[0].message.content.strip()
            
        except RateLimitError:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de OpenAI excedida")
        except OpenAIError as e:
            raise Exception(f"Error de OpenAI: {e}")
