"""
Management command para limpiar datos de prueba del dashboard
Uso: python manage.py clear_dashboard_data
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from apps.trans.models import Transaction

User = get_user_model()


class Command(BaseCommand):
    help = 'Limpia datos de prueba del dashboard'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Confirmar eliminación sin preguntar'
        )

    def handle(self, *args, **options):
        should_confirm = options['confirm']

        # Contar datos a eliminar
        students_count = User.objects.filter(
            rol=2, 
            email__startswith='student'
        ).count()
        transactions_count = Transaction.objects.filter(
            user__rol=2,
            user__email__startswith='student'
        ).count()

        if students_count == 0 and transactions_count == 0:
            self.stdout.write(self.style.WARNING('⚠️  No hay datos de prueba para eliminar'))
            return

        # Mostrar resumen
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.WARNING('⚠️  ADVERTENCIA: SE ELIMINARÁN LOS SIGUIENTES DATOS'))
        self.stdout.write('='*60)
        self.stdout.write(f'👥 Estudiantes de prueba: {students_count}')
        self.stdout.write(f'📊 Transacciones: {transactions_count}')
        self.stdout.write('='*60 + '\n')

        # Confirmar
        if not should_confirm:
            confirm = input('¿Estás seguro de que quieres eliminar estos datos? (escriba "SI" para confirmar): ')
            if confirm != 'SI':
                self.stdout.write(self.style.WARNING('❌ Operación cancelada'))
                return

        # Eliminar datos
        self.stdout.write('🗑️  Eliminando datos...')
        
        with transaction.atomic():
            # Las transacciones se eliminarán en cascada al eliminar usuarios
            deleted_students = User.objects.filter(
                rol=2,
                email__startswith='student'
            ).delete()

        self.stdout.write(self.style.SUCCESS('\n✅ Datos eliminados exitosamente'))
        self.stdout.write(f'   Estudiantes eliminados: {deleted_students[0]}')
        self.stdout.write(f'   Registros totales eliminados: {deleted_students[1]}\n')