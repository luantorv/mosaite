# backend/apps/core/management/commands/init_config.py

from django.core.management.base import BaseCommand
from django.db import transaction
from .models import Config 

class Command(BaseCommand):
    help = 'Inicializa la configuración única del sistema (tabla Config)'

    def add_arguments(self, parser):
        # Argumentos que el TUI le pasará
        parser.add_argument('--company', type=str, required=True, help='Nombre de la compañía')
        parser.add_argument('--currency', type=str, required=True, help='Símbolo de moneda (ej. $)')
        parser.add_argument('--date-format', type=str, required=True, help='Formato de fecha (ej. DD/MM/AAAA)')
        # Asumo que system_mode es un booleano, 'True' para online
        parser.add_argument('--system-mode', type=str, required=True, help="'online' o 'offline'")

    @transaction.atomic
    def handle(self, *args, **options):
        # Comprobar si ya existe una configuración
        if Config.objects.exists():
            self.stdout.write(self.style.WARNING('La configuración ya existe. Actualizando...'))
            config = Config.objects.first()
        else:
            self.stdout.write(self.style.SUCCESS('Creando nueva configuración...'))
            config = Config()

        # Poblar los datos
        config.company_name = options['company']
        config.currency = options['currency']
        config.date_format = options['date_format']
        config.system_mode = (options['system_mode'].lower() == 'online') # Convertir a Booleano
        
        config.save()
        
        self.stdout.write(self.style.SUCCESS(f'Configuración guardada para: {config.company_name}'))