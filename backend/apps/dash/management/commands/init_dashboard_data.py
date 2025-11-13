"""
Management command para inicializar datos del dashboard
Uso: python manage.py init_dashboard_data
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from datetime import datetime, timedelta
import random
from apps.accounts.models import Account
from apps.trans.models import Transaction, TransactionEntry

User = get_user_model()


class Command(BaseCommand):
    help = 'Inicializa datos de prueba para el dashboard'

    def add_arguments(self, parser):
        parser.add_argument(
            '--students',
            type=int,
            default=30,
            help='Número de estudiantes a crear (default: 30)'
        )
        parser.add_argument(
            '--groups',
            type=int,
            default=4,
            help='Número de grupos (default: 4)'
        )
        parser.add_argument(
            '--transactions-per-student',
            type=int,
            default=12,
            help='Promedio de transacciones por estudiante (default: 12)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Eliminar datos existentes antes de crear'
        )

    def handle(self, *args, **options):
        num_students = options['students']
        num_groups = options['groups']
        avg_transactions = options['transactions_per_student']
        should_clear = options['clear']

        self.stdout.write(self.style.WARNING('Inicializando datos del dashboard...'))

        with transaction.atomic():
            if should_clear:
                self.stdout.write('🗑️  Limpiando datos existentes...')
                # Eliminar transacciones y estudiantes de prueba
                Transaction.objects.filter(user__rol=2).delete()
                User.objects.filter(rol=2, email__startswith='student').delete()
                self.stdout.write(self.style.SUCCESS('✅ Datos eliminados'))

            # 1. Verificar que existan cuentas
            if Account.objects.count() < 10:
                self.stdout.write(self.style.ERROR(
                    '❌ Error: No hay suficientes cuentas en el sistema. '
                    'Ejecuta primero: python manage.py init_plan_cuentas'
                ))
                return

            # 2. Crear grupos
            grupos = [f'Grupo {chr(65 + i)}' for i in range(num_groups)]  # A, B, C, D...
            self.stdout.write(f'📚 Grupos a crear: {", ".join(grupos)}')

            # 3. Crear estudiantes
            self.stdout.write(f'👥 Creando {num_students} estudiantes...')
            students = []
            
            for i in range(1, num_students + 1):
                grupo = random.choice(grupos)
                student = User.objects.create_user(
                    email=f'student{i:03d}@mosaite.edu',
                    password='student123',  # Contraseña genérica
                    name=f'Estudiante {i:03d}',
                    group=grupo,
                    rol=2,  # Student
                    status=0  # Activo
                )
                students.append(student)
                
                if i % 10 == 0:
                    self.stdout.write(f'  ✓ Creados {i}/{num_students} estudiantes')

            self.stdout.write(self.style.SUCCESS(f'✅ {len(students)} estudiantes creados'))

            # 4. Obtener cuentas para transacciones
            cuentas_activo = list(Account.objects.filter(nature=True, status=True)[:10])
            cuentas_pasivo = list(Account.objects.filter(nature=False, status=True)[:10])

            if not cuentas_activo or not cuentas_pasivo:
                self.stdout.write(self.style.ERROR(
                    '❌ Error: No hay cuentas de Activo y Pasivo disponibles'
                ))
                return

            # 5. Crear transacciones distribuidas en 6 meses
            self.stdout.write(f'📊 Creando transacciones...')
            total_transactions = 0
            hoy = datetime.now()
            hace_6_meses = hoy - timedelta(days=180)

            for student in students:
                # Número aleatorio de transacciones por estudiante
                num_trans = random.randint(
                    max(1, avg_transactions - 5),
                    avg_transactions + 5
                )

                for _ in range(num_trans):
                    # Fecha aleatoria en los últimos 6 meses
                    dias_atras = random.randint(0, 180)
                    fecha = hoy - timedelta(days=dias_atras)
                    fecha_str = fecha.strftime('%Y-%m-%d')
                    
                    # Monto aleatorio (entre $500 y $50,000 en centavos)
                    monto = random.randint(50000, 5000000)
                    
                    # Estado aleatorio (mayoría verificados/cerrados)
                    status_choice = random.choices(
                        [0, 1, 2],  # to_check, checked, closed
                        weights=[10, 60, 30],  # Pesos: 10% to_check, 60% checked, 30% closed
                        k=1
                    )[0]
                    
                    # Crear transacción
                    trans = Transaction.objects.create(
                        user=student,
                        status=status_choice,
                        date=fecha_str,
                        legend=self._generar_leyenda(),
                        created_at=fecha.isoformat(),
                        updated_at=fecha.isoformat()
                    )
                    
                    # Crear entradas (siempre balanceadas)
                    cuenta_debe = random.choice(cuentas_activo)
                    cuenta_haber = random.choice(cuentas_pasivo)
                    
                    # Entrada de débito
                    TransactionEntry.objects.create(
                        trans=trans,
                        acc=cuenta_debe,
                        debit=monto,
                        credit=0
                    )
                    
                    # Entrada de crédito
                    TransactionEntry.objects.create(
                        trans=trans,
                        acc=cuenta_haber,
                        debit=0,
                        credit=monto
                    )
                    
                    total_transactions += 1

                if students.index(student) % 5 == 0:
                    self.stdout.write(f'  ✓ Procesados {students.index(student) + 1}/{len(students)} estudiantes')

            self.stdout.write(self.style.SUCCESS(
                f'✅ {total_transactions} transacciones creadas'
            ))

            # 6. Actualizar saldos de cuentas (simulación simple)
            self.stdout.write('💰 Actualizando saldos de cuentas...')
            for cuenta in Account.objects.all():
                # Calcular saldo basado en entradas
                entradas = TransactionEntry.objects.filter(acc=cuenta)
                total_debe = sum(e.debit for e in entradas)
                total_haber = sum(e.credit for e in entradas)
                
                if cuenta.nature:  # Deudora
                    cuenta.saldo = total_debe - total_haber
                else:  # Acreedora
                    cuenta.saldo = total_haber - total_debe
                
                cuenta.save()
            
            self.stdout.write(self.style.SUCCESS('✅ Saldos actualizados'))

        # Resumen final
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('🎉 INICIALIZACIÓN COMPLETADA'))
        self.stdout.write('='*60)
        self.stdout.write(f'👥 Estudiantes creados: {len(students)}')
        self.stdout.write(f'📚 Grupos: {", ".join(grupos)}')
        self.stdout.write(f'📊 Transacciones creadas: {total_transactions}')
        self.stdout.write(f'💰 Cuentas actualizadas: {Account.objects.count()}')
        self.stdout.write('\n📝 Credenciales de acceso:')
        self.stdout.write(f'   Email: student001@mosaite.edu (hasta student{num_students:03d}@mosaite.edu)')
        self.stdout.write(f'   Contraseña: student123')
        self.stdout.write('='*60 + '\n')

    def _generar_leyenda(self):
        """Genera una leyenda aleatoria realista"""
        leyendas = [
            'Compra de materiales de oficina',
            'Pago de servicios públicos',
            'Venta de productos',
            'Cobro de servicios profesionales',
            'Pago de sueldos',
            'Compra de mercadería',
            'Pago a proveedores',
            'Ingreso por ventas',
            'Gastos de mantenimiento',
            'Compra de equipamiento',
            'Depósito bancario',
            'Retiro de efectivo',
            'Pago de alquiler',
            'Facturación de servicios',
            'Compra de insumos',
            'Pago de impuestos',
            'Cobro de facturas',
            'Gastos administrativos',
            'Inversión en activos fijos',
            'Pago de honorarios profesionales',
        ]
        return random.choice(leyendas)