from django.core.management.base import BaseCommand
from services.chat.init_index import initialize_index


class Command(BaseCommand):
    help = 'Inicializa el servicio de chat y crea el índice de vectores'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Inicializando servicio de chat...'))
        
        success = initialize_index()
        
        if success:
            self.stdout.write(
                self.style.SUCCESS('Servicio de chat inicializado correctamente')
            )
        else:
            self.stdout.write(
                self.style.ERROR('Error al inicializar el servicio de chat')
            )