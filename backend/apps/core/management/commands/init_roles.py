from django.core.management.base import BaseCommand
from apps.users.models import Role


class Command(BaseCommand):
    help = 'Inicializa los roles del sistema'

    def handle(self, *args, **options):
        """Crea los roles predefinidos del sistema"""
        
        roles = [
            # Roles para Business Mode (system_mode = True)
            {'role_id': 1, 'name': 'Admin'},
            {'role_id': 2, 'name': 'Manager'},
            {'role_id': 3, 'name': 'Accountant'},
            {'role_id': 4, 'name': 'Operator'},
            {'role_id': 5, 'name': 'Viewer'},
            
            # Roles para Education Mode (system_mode = False)
            {'role_id': 6, 'name': 'Professor'},
            {'role_id': 7, 'name': 'Student'},
        ]
        
        created_count = 0
        existing_count = 0
        
        for role_data in roles:
            role, created = Role.objects.get_or_create(
                role_id=role_data['role_id'],
                defaults={'name': role_data['name']}
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Rol creado: {role.name}')
                )
            else:
                existing_count += 1
                self.stdout.write(
                    self.style.WARNING(f'- Rol ya existe: {role.name}')
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Proceso completado: {created_count} roles creados, {existing_count} ya existían'
            )
        )