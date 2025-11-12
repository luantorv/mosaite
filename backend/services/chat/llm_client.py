from llama_cpp import Llama
from typing import Optional, Generator
import threading
from .config import (
    LLM_MODEL_PATH,
    LLM_CONTEXT_SIZE,
    LLM_MAX_TOKENS,
    LLM_TEMPERATURE,
    LLM_TOP_P
)


class LLMClient:
    """Cliente para interactuar con el modelo LLM local usando llama.cpp"""
    
    def __init__(self):
        self.model: Optional[Llama] = None
        self.is_loaded = False
        self._lock = threading.Lock()
        self._stop_generation = False
    
    def load_model(self):
        """Carga el modelo LLM"""
        if self.is_loaded:
            return
        
        with self._lock:
            if self.is_loaded:
                return
            
            try:
                print(f"Cargando modelo LLM desde: {LLM_MODEL_PATH}")
                self.model = Llama(
                    model_path=LLM_MODEL_PATH,
                    n_ctx=LLM_CONTEXT_SIZE,
                    n_threads=4,
                    verbose=False,
                    n_batch=512,  # Agregar batch size
                    use_mlock=True,  # Evitar swap
                )
                self.is_loaded = True
                print("Modelo LLM cargado exitosamente")
            except Exception as e:
                print(f"Error al cargar modelo LLM: {e}")
                raise
    
    def _truncate_prompt(self, prompt: str, max_length: int = 2000) -> str:
        """Trunca el prompt si es muy largo para evitar problemas"""
        if len(prompt) > max_length:
            print(f"Prompt truncado de {len(prompt)} a {max_length} caracteres")
            return prompt[:max_length] + "\n\nRespuesta:"
        return prompt
    
    def generate(
        self,
        user_prompt: str,
        system_prompt: str,
        max_tokens: int = LLM_MAX_TOKENS,
        temperature: float = LLM_TEMPERATURE,
        top_p: float = LLM_TOP_P,
        stream: bool = False
    ) -> str:
        """
        Genera una respuesta del modelo usando la API de Chat.
        
        Args:
            user_prompt: El prompt del usuario (contexto + pregunta)
            system_prompt: Las instrucciones del sistema (reglas)
            ...
        
        Returns:
            La respuesta generada o un generador
        """
        if not self.is_loaded:
            self.load_model()
        
        self._stop_generation = False
        
        # Construir el formato de mensajes que espera Llama 3.1
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
                    stop=["<|eot_id|>"], # <|eot_id|> es el token de parada oficial de Llama 3
                    repeat_penalty=1.1,
                )
                
                response = output['choices'][0]['message']['content'].strip()
                
                # Validar que la respuesta no esté vacía
                if not response or len(response) < 10:
                    return "Lo siento, no pude generar una respuesta apropiada. Por favor, intenta reformular tu pregunta."
                
                return response
                
        except Exception as e:
            print(f"Error en generación del LLM: {e}")
            return f"Error al generar respuesta: {str(e)}"

    def _generate_stream(
        self,
        messages: list,
        max_tokens: int,
        temperature: float,
        top_p: float
    ) -> Generator[str, None, None]:
        """Genera respuesta en modo streaming usando API de Chat"""
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
            print(f"Error en streaming: {e}")
            yield f"Error en streaming: {str(e)}"
    
    def stop_generation(self):
        """Detiene la generación actual"""
        self._stop_generation = True
    
    def unload_model(self):
        """Descarga el modelo de memoria"""
        with self._lock:
            if self.model is not None:
                del self.model
                self.model = None
                self.is_loaded = False
                print("Modelo LLM descargado")


# Instancia global del cliente
llm_client = LLMClient()