from typing import Dict, Optional, Generator
import threading
from .vector_store import vector_store
from .llm_client import llm_client
from .config import TOP_K_RESULTS, SYSTEM_PROMPT


class RAGService:
    """Servicio principal de RAG"""
    
    def __init__(self):
        self._generation_threads: Dict[str, threading.Thread] = {}
        self._stop_flags: Dict[str, bool] = {}
    
    def initialize(self):
        """Inicializa todos los componentes del RAG"""
        print("Inicializando servicio RAG...")
        vector_store.initialize()
        llm_client.load_model()
        print("Servicio RAG inicializado")
    
    def query(
        self,
        question: str,
        request_id: Optional[str] = None,
        stream: bool = False
    ) -> Dict:
        """
        Procesa una consulta usando RAG
        
        Args:
            question: Pregunta del usuario
            request_id: ID único para tracking de la petición
            stream: Si True, retorna respuesta en streaming
        
        Returns:
            Diccionario con la respuesta y metadata
        """
        try:
            # Buscar contexto relevante
            print(f"Buscando contexto para: {question[:50]}...")
            results = vector_store.search(question, k=TOP_K_RESULTS)
            
            if not results:
                return {
                    'answer': 'No encontré información relevante en mi base de conocimiento para responder tu pregunta. Por favor, intenta hacer una pregunta más específica sobre contabilidad.',
                    'sources': [],
                    'context_used': False
                }
            
            # Construir contexto
            context = self._build_context(results)
            
            # Validar longitud del contexto
            if len(context) > 1200:
                # Truncar contexto si es muy largo
                context = context[:1200] + "..."
                print(f"Contexto truncado a 1200 caracteres")
            
            # Crear prompt
            prompt = SYSTEM_PROMPT.format(
                context=context,
                question=question
            )
            
            # Validar longitud total del prompt
            if len(prompt) > 1800:
                # Reducir contexto aún más
                context = context[:800] + "..."
                prompt = SYSTEM_PROMPT.format(
                    context=context,
                    question=question
                )
            
            # Generar respuesta
            print("Generando respuesta...")
            
            if stream:
                # Modo streaming
                def generate():
                    try:
                        for chunk in llm_client.generate(
                            prompt,
                            stream=True
                        ):
                            if request_id and self._stop_flags.get(request_id, False):
                                break
                            yield chunk
                    except Exception as e:
                        print(f"Error en streaming: {e}")
                        yield f"Error: {str(e)}"
                
                return {
                    'answer': generate(),
                    'sources': self._extract_sources(results),
                    'context_used': True,
                    'streaming': True
                }
            else:
                # Modo normal con timeout y manejo de errores
                try:
                    answer = llm_client.generate(prompt, stream=False)
                    
                    # Validar respuesta
                    if not answer or "Error" in answer[:20]:
                        answer = self._generate_fallback_response(question, results)
                    
                except Exception as e:
                    print(f"Error al generar con LLM: {e}")
                    answer = self._generate_fallback_response(question, results)
                
                return {
                    'answer': answer,
                    'sources': self._extract_sources(results),
                    'context_used': True,
                    'streaming': False
                }
        
        except Exception as e:
            print(f"Error en query: {e}")
            import traceback
            traceback.print_exc()
            
            return {
                'answer': 'Lo siento, ocurrió un error al procesar tu consulta. Por favor, intenta con una pregunta más simple o reformula tu pregunta.',
                'sources': [],
                'context_used': False,
                'error': str(e)
            }
    
    def _generate_fallback_response(self, question: str, results: list) -> str:
        """Genera una respuesta simple basada solo en el contexto sin usar el LLM"""
        print("Generando respuesta fallback sin LLM...")
        
        if not results:
            return "No encontré información relevante para responder tu pregunta."
        
        # Extraer el texto más relevante
        top_result = results[0]
        text = top_result.get('text', '')[:500]
        source = top_result.get('source', 'documento')
        
        response = f"Según la información disponible en {source}:\n\n{text}"
        
        if len(results) > 1:
            response += f"\n\nTambién encontré información relacionada en otros {len(results)-1} documento(s)."
        
        return response
    
    def _build_context(self, results: list) -> str:
        """Construye el contexto a partir de los resultados de búsqueda"""
        context_parts = []
        
        for i, result in enumerate(results, 1):
            source = result.get('source', 'Desconocido')
            text = result.get('text', '')
            
            # Limitar cada fragmento a 300 caracteres
            if len(text) > 300:
                text = text[:300] + "..."
            
            context_parts.append(f"[Fuente {i}: {source}]\n{text}")
        
        return "\n\n".join(context_parts)
    
    def _extract_sources(self, results: list) -> list:
        """Extrae información de las fuentes"""
        sources = []
        seen = set()
        
        for result in results:
            source = result.get('source', 'Desconocido')
            if source not in seen:
                sources.append({
                    'name': source,
                    'similarity': result.get('similarity', 0)
                })
                seen.add(source)
        
        return sources
    
    def cancel_request(self, request_id: str):
        """Cancela una petición en curso"""
        self._stop_flags[request_id] = True
        llm_client.stop_generation()
        print(f"Petición {request_id} cancelada")
    
    def rebuild_index(self):
        """Reconstruye el índice de vectores"""
        vector_store.rebuild()
    
    def get_stats(self) -> Dict:
        """Obtiene estadísticas del servicio"""
        return vector_store.get_stats()


# Instancia global del servicio RAG
rag_service = RAGService()