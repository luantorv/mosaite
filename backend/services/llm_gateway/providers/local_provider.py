import os
from pathlib import Path
from typing import Optional, Generator
import threading
from llama_cpp import Llama
from .base import LLMProvider, ProviderType, ProviderStatus


class LocalProvider(LLMProvider):
    """Provider para modelo local usando llama.cpp"""
    
    def __init__(self, model_path: Optional[str] = None):
        super().__init__(ProviderType.LOCAL)
        
        # Si no se especifica ruta, usar la ruta por defecto
        if model_path is None:
            base_dir = Path(__file__).resolve().parent.parent
            model_path = base_dir / "core" / "Meta-Llama-3.1-8B-Instruct-Q3_K_S.gguf"
        
        self.model_path = str(model_path)
        self.model: Optional[Llama] = None
        self._lock = threading.Lock()
        self._stop_generation = False
        
        # Configuración del modelo
        self.n_ctx = 2048
        self.n_threads = 4
        self.n_batch = 512
    
    def initialize(self) -> bool:
        """Inicializa verificando que el modelo existe"""
        if not os.path.exists(self.model_path):
            self.status = ProviderStatus.UNAVAILABLE
            self.error_message = f"Modelo no encontrado en: {self.model_path}"
            print(f"[Local] Modelo no encontrado en: {self.model_path}")
            return False
        
        # No cargamos el modelo aquí (lazy loading)
        self.status = ProviderStatus.AVAILABLE
        self._is_initialized = True
        print(f"[Local] Provider inicializado (lazy loading). Modelo: {self.model_path}")
        return True
    
    def health_check(self) -> bool:
        """Verifica que el archivo del modelo existe"""
        exists = os.path.exists(self.model_path)
        if exists:
            self.status = ProviderStatus.AVAILABLE
            self.error_message = None
        else:
            self.status = ProviderStatus.UNAVAILABLE
            self.error_message = "Modelo no encontrado"
        return exists
    
    def _load_model(self):
        """Carga el modelo en memoria (lazy loading)"""
        if self.model is not None:
            return
        
        with self._lock:
            if self.model is not None:
                return
            
            try:
                print(f"[Local] Cargando modelo desde: {self.model_path}")
                self.model = Llama(
                    model_path=self.model_path,
                    n_ctx=self.n_ctx,
                    n_threads=self.n_threads,
                    verbose=False,
                    n_batch=self.n_batch,
                    use_mlock=True,
                )
                print("[Local] Modelo cargado exitosamente")
            except Exception as e:
                self.status = ProviderStatus.ERROR
                self.error_message = f"Error al cargar modelo: {e}"
                print(f"[Local] Error al cargar modelo: {e}")
                raise
    
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.9,
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """Genera respuesta usando el modelo local"""
        if self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        # Cargar modelo si no está cargado
        self._load_model()
        
        self._stop_generation = False
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        try:
            if stream:
                return self._generate_stream(messages, max_tokens, temperature, top_p)
            else:
                output = self.model.create_chat_completion(
                    messages=messages,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    top_p=top_p,
                    stop=["<|eot_id|>"],
                    repeat_penalty=1.1,
                )
                
                response = output['choices'][0]['message']['content'].strip()
                
                # Validar que la respuesta no esté vacía
                if not response or len(response) < 10:
                    return "Lo siento, no pude generar una respuesta apropiada. Por favor, intenta reformular tu pregunta."
                
                return response
                
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Local] Error en generación: {e}")
            raise Exception(f"Error al generar respuesta: {str(e)}")
    
    def _generate_stream(
        self,
        messages: list,
        max_tokens: int,
        temperature: float,
        top_p: float
    ) -> Generator[str, None, None]:
        """Genera respuesta en modo streaming"""
        try:
            stream = self.model.create_chat_completion(
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                stop=["<|eot_id|>"],
                stream=True,
                repeat_penalty=1.1,
            )
            
            for output in stream:
                if self._stop_generation:
                    break
                
                delta = output['choices'][0].get('delta', {})
                if 'content' in delta:
                    text = delta['content']
                    if text:
                        yield text
                    
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            print(f"[Local] Error en streaming: {e}")
            yield f"Error en streaming: {str(e)}"
    
    def generate_simple(
        self,
        prompt: str,
        max_tokens: int = 200
    ) -> str:
        """Genera respuesta simple para casos como consultorIA"""
        if self.status != ProviderStatus.AVAILABLE:
            raise Exception(f"Provider no disponible: {self.error_message}")
        
        # Cargar modelo si no está cargado
        self._load_model()
        
        try:
            response = self.model.create_chat_completion(
                messages=[
                    {"role": "system", "content": "Sos un asistente breve y directo."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens
            )
            
            return response["choices"][0]["message"]["content"].strip()
            
        except Exception as e:
            self.status = ProviderStatus.ERROR
            self.error_message = str(e)
            raise Exception(f"Error al generar respuesta: {str(e)}")
    
    def stop_generation(self):
        """Detiene la generación actual"""
        self._stop_generation = True
    
    def shutdown(self):
        """Descarga el modelo de memoria"""
        with self._lock:
            if self.model is not None:
                del self.model
                self.model = None
                print("[Local] Modelo descargado de memoria")
