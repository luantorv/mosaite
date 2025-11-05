"""
Cliente para interactuar con LLM local usando llama-cpp-python.
Maneja la generación de respuestas basadas en contexto.
"""
import logging
from typing import Optional, Dict, Any
from llama_cpp import Llama

logger = logging.getLogger(__name__)


class LLMClient:
    """
    Cliente para ejecutar un LLM local con llama.cpp.
    """
    
    def __init__(
        self,
        model_path: str,
        n_ctx: int = 2048,
        n_threads: Optional[int] = None,
        n_gpu_layers: int = 0,
        **kwargs
    ):
        """
        Inicializa el cliente LLM.
        
        Args:
            model_path: Ruta al archivo .gguf del modelo
            n_ctx: Tamaño del contexto (tokens)
            n_threads: Número de threads CPU (None = auto)
            n_gpu_layers: Número de capas a cargar en GPU (0 = solo CPU)
            **kwargs: Argumentos adicionales para Llama()
        """
        logger.info(f"Cargando modelo LLM desde: {model_path}")
        
        self.llm = Llama(
            model_path=model_path,
            n_ctx=n_ctx,
            n_threads=n_threads,
            n_gpu_layers=n_gpu_layers,
            verbose=False,
            **kwargs
        )
        
        self.model_path = model_path
        logger.info("Modelo LLM cargado exitosamente")
    
    def generate(
        self,
        prompt: str,
        max_tokens: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.95,
        stop: Optional[list] = None,
        **kwargs
    ) -> str:
        """
        Genera una respuesta del LLM.
        
        Args:
            prompt: El prompt completo para el modelo
            max_tokens: Máximo de tokens a generar
            temperature: Temperatura de generación (0-1, menor = más determinístico)
            top_p: Nucleus sampling parameter
            stop: Lista de strings donde detener la generación
            **kwargs: Argumentos adicionales para la generación
        
        Returns:
            Texto generado por el modelo
        """
        try:
            response = self.llm(
                prompt,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                stop=stop,
                echo=False,
                **kwargs
            )
            
            # Extraer el texto generado
            generated_text = response['choices'][0]['text']
            return generated_text.strip()
            
        except Exception as e:
            logger.error(f"Error al generar respuesta: {e}")
            raise
    
    def generate_with_context(
        self,
        query: str,
        context: str,
        system_prompt: Optional[str] = None,
        max_tokens: int = 512,
        **kwargs
    ) -> str:
        """
        Genera una respuesta usando contexto RAG.
        
        Args:
            query: Pregunta del usuario
            context: Contexto recuperado del vector store
            system_prompt: Prompt de sistema opcional
            max_tokens: Máximo de tokens a generar
            **kwargs: Argumentos adicionales para generate()
        
        Returns:
            Respuesta generada basada en el contexto
        """
        # Construir el prompt
        if system_prompt is None:
            system_prompt = (
                "Eres un asistente útil. Responde la pregunta del usuario "
                "basándote únicamente en el contexto proporcionado. "
                "Si no puedes responder con la información del contexto, "
                "indícalo claramente."
            )
        
        prompt = f"""{system_prompt}

Contexto:
{context}

Pregunta: {query}

Respuesta:"""
        
        return self.generate(prompt, max_tokens=max_tokens, **kwargs)
    
    def __del__(self):
        """Limpia recursos al destruir el objeto."""
        if hasattr(self, 'llm'):
            del self.llm