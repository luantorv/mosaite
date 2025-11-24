from django.core.management.base import BaseCommand
from services.chat import vector_store
from apps.chat.models import IndexStatus
from datetime import datetime


class Command(BaseCommand):
    help = 'Reconstruye el índice de vectores del chat'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Reconstruyendo índice de vectores...'))
        
        # Actualizar estado
        status = IndexStatus.get_current_status()
        status.is_available = False
        status.is_rebuilding = True
        status.save()
        
        try:
            # Reconstruir
            vector_store.rebuild()
            
            # Obtener estadísticas
            from services.chat import rag_service
            stats = rag_service.get_stats()
            
            # Actualizar estado
            status.is_available = True
            status.is_rebuilding = False
            status.last_rebuild = datetime.now().isoformat()
            status.total_vectors = stats['total_vectors']
            status.total_documents = stats['total_documents']
            status.save()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Índice reconstruido: {stats["total_vectors"]} vectores, '
                    f'{stats["total_documents"]} documentos'
                )
            )
            
        except Exception as e:
            status.is_available = True
            status.is_rebuilding = False
            status.save()
            
            self.stdout.write(
                self.style.ERROR(f'Error al reconstruir índice: {e}')
            )