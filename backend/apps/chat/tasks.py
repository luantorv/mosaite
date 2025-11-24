import threading
from datetime import datetime
from services.chat import rag_service
from .models import IndexStatus


def rebuild_index_task(user_id):
    """
    Tarea para reconstruir el índice en segundo plano
    """
    print(f"Iniciando reconstrucción del índice por usuario {user_id}")
    
    # Actualizar estado
    status = IndexStatus.get_current_status()
    status.is_available = False
    status.is_rebuilding = True
    status.save()
    
    try:
        # Reconstruir índice
        rag_service.rebuild_index()
        
        # Actualizar estadísticas
        stats = rag_service.get_stats()
        
        status.is_available = True
        status.is_rebuilding = False
        status.last_rebuild = datetime.now().isoformat()
        status.total_vectors = stats.get('total_vectors', 0)
        status.total_documents = stats.get('total_documents', 0)
        status.rebuild_by_id = user_id
        status.save()
        
        print("Reconstrucción completada exitosamente")
        
    except Exception as e:
        print(f"Error en reconstrucción: {e}")
        
        # Restaurar disponibilidad aunque haya fallado
        status.is_available = True
        status.is_rebuilding = False
        status.save()


def start_rebuild_index(user_id):
    """Inicia la reconstrucción del índice en un thread separado"""
    thread = threading.Thread(target=rebuild_index_task, args=(user_id,))
    thread.daemon = True
    thread.start()
    return thread