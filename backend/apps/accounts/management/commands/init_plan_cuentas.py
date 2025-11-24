from django.core.management.base import BaseCommand
from apps.accounts.models import Account
from apps.accounts.data.plan_cuentas_inicial import PLAN_CUENTAS_INICIAL


class Command(BaseCommand):
    help = 'Inicializa el plan de cuentas con las cuentas predeterminadas'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Eliminar todas las cuentas existentes antes de inicializar',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING('Eliminando cuentas existentes...'))
            count = Account.objects.count()
            Account.objects.all().delete()
            self.stdout.write(self.style.SUCCESS(f'✓ {count} cuentas eliminadas'))

        self.stdout.write('Inicializando plan de cuentas...')
        
        created_count = 0
        updated_count = 0
        error_count = 0
        
        for code, name, nature, status in PLAN_CUENTAS_INICIAL:
            try:
                account, created = Account.objects.update_or_create(
                    code=str(code),
                    defaults={
                        'name': name,
                        'nature': nature == 0,  # Convertir 0/1 a bool
                        'status': status == 1,  # Convertir 0/1 a bool
                        'saldo': 0
                    }
                )
                
                if created:
                    created_count += 1
                else:
                    updated_count += 1
                    
            except Exception as e:
                error_count += 1
                self.stdout.write(
                    self.style.ERROR(f'✗ Error con cuenta {code}: {str(e)}')
                )
        
        self.stdout.write('\n' + '='*50)
        self.stdout.write(self.style.SUCCESS(f'✓ Cuentas creadas: {created_count}'))
        
        if updated_count > 0:
            self.stdout.write(self.style.WARNING(f'⟳ Cuentas actualizadas: {updated_count}'))
        
        if error_count > 0:
            self.stdout.write(self.style.ERROR(f'✗ Errores: {error_count}'))
        
        self.stdout.write(self.style.SUCCESS(f'\n✓ Plan de cuentas inicializado correctamente'))
        self.stdout.write(f'Total de cuentas en el sistema: {Account.objects.count()}')