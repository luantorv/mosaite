"""
Script para inicializar el índice de vectores
"""
from services.chat import rag_service, vector_store
from apps.chat.models import IndexStatus


def initialize_index():
    """Inicializa el índice y actualiza el estado"""
    print("=" * 50)
    print("INICIALIZANDO SERVICIO DE CHAT")
    print("=" * 50)
    
    try:
        # Verificar que existan archivos en data
        from services.chat.config import DATA_DIR
        files = list(DATA_DIR.glob("**/*"))
        files = [f for f in files if f.suffix.lower() in ['.md', '.txt']]
        
        if not files:
            print("\nADVERTENCIA: No se encontraron archivos en services/chat/data/")
            print("Por favor, agrega archivos .md o .txt con contenido para indexar")
            return False
        
        print(f"\nEncontrados {len(files)} archivos para indexar:")
        for f in files:
            print(f"  - {f.name}")
        
        # Inicializar servicio
        print("\n1. Inicializando embedder...")
        from services.chat.embedder import embedder
        embedder.load_model()
        
        print("\n2. Inicializando vector store...")
        vector_store.initialize()
        
        print("\n3. Cargando modelo LLM...")
        from services.chat.llm_client import llm_client
        llm_client.load_model()
        
        # Obtener estadísticas
        stats = rag_service.get_stats()
        
        print("\n" + "=" * 50)
        print("ESTADÍSTICAS DEL ÍNDICE")
        print("=" * 50)
        print(f"Total de vectores: {stats['total_vectors']}")
        print(f"Total de documentos: {stats['total_documents']}")
        print(f"Dimensión de embeddings: {stats['embedding_dimension']}")
        
        # Actualizar estado en la base de datos
        try:
            status = IndexStatus.get_current_status()
            status.total_vectors = stats['total_vectors']
            status.total_documents = stats['total_documents']
            status.is_available = True
            status.is_rebuilding = False
            status.save()
            print("\nEstado actualizado en la base de datos")
        except Exception as e:
            print(f"\nNo se pudo actualizar el estado en la BD: {e}")
            print("Asegúrate de haber ejecutado las migraciones")
        
        print("Servicio de chat inicializado correctamente")
        return True
        
    except Exception as e:
        print(f"\nError al inicializar: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    initialize_index()