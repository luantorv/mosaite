import os
from typing import Generator, Optional
import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
from .base import LLMProvider, ProviderType, ProviderStatus


class GoogleProvider(LLMProvider):
    """Provider para Google Gemini API"""
    
    def __init__(self, model: str = "gemini-2.5-flash"):
        super().__init__(ProviderType.GOOGLE)
        self.api_key = os.getenv("GOOGLE_API_KEY")
        self.model_name = model
        self.model: Optional[genai.GenerativeModel] = None
    
    def initialize(self) -> bool:
        """Inicializa el cliente de Google Gemini"""
        if not self.api_key:
            self.status = ProviderStatus.UNAVAILABLE
            self.error_message = "GOOGLE_API_KEY no configurada"
            return False
        
        try:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(self.model_name)
            
            # Realizar una llamada de prueba
            if self.health_check():
                self.status = ProviderStatus.AVAILABLE
                self._is_initialized = True
                print(f"[Google] Inicializado correctamente con modelo {self.model_name}")
                return True
            else:
                return False
                
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Google] Error en inicialización: {e}")
            return False
    
    def health_check(self) -> bool:
        """Verifica disponibilidad con una llamada mínima"""
        if not self.model:
            return False
        
        try:
            response = self.model.generate_content(
                "test",
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=5,
                )
            )
            self.status = ProviderStatus.AVAILABLE
            self.error_message = None
            return True
            
        except google_exceptions.ResourceExhausted:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            self.error_message = "Cuota excedida"
            print("[Google] Cuota excedida")
            return False
        except google_exceptions.PermissionDenied:
            self.status = ProviderStatus.ERROR
            self.error_message = "Error de autenticación"
            return False
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Google] Health check falló: {e}")
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
        """Genera respuesta usando Google Gemini API"""
        if not self.model or self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        # Gemini maneja el system prompt de forma diferente
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
        )
        
        try:
            if stream:
                return self._generate_stream(full_prompt, generation_config)
            else:
                response = self.model.generate_content(
                    full_prompt,
                    generation_config=generation_config
                )
                return response.text.strip()
                
        except google_exceptions.ResourceExhausted:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de Google excedida")
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            raise Exception(f"Error de Google: {e}")
    
    def _generate_stream(
        self,
        prompt: str,
        generation_config
    ) -> Generator[str, None, None]:
        """Genera respuesta en modo streaming"""
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=generation_config,
                stream=True
            )
            
            for chunk in response:
                if chunk.text:
                    yield chunk.text
                    
        except google_exceptions.ResourceExhausted:
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
        if not self.model or self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        system_msg = "Sos un asistente breve y directo."
        full_prompt = f"{system_msg}\n\n{prompt}"
        
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=max_tokens,
        )
        
        try:
            response = self.model.generate_content(
                full_prompt,
                generation_config=generation_config
            )
            return response.text.strip()
            
        except google_exceptions.ResourceExhausted:
            self.status = ProviderStatus.QUOTA_EXCEEDED
            raise Exception("Cuota de Google excedida")
        except Exception as e:
            raise Exception(f"Error de Google: {e}")
