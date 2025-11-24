"""
Management command para verificar estadísticas del dashboard
Uso: python manage.py check_dashboard_stats
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.models import Count
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account

User = get_user_model()


class Command(BaseCommand):
    help = 'Muestra estadísticas actuales del dashboard'

    def handle(self, *args, **options):
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('📊 ESTADÍSTICAS DEL DASHBOARD'))
        self.stdout.write('='*60 + '\n')

        # 1. Usuarios
        total_students = User.objects.filter(rol=2, status=0).count()
        grupos = User.objects.filter(rol=2, status=0).values('group').distinct().count()
        
        self.stdout.write(self.style.HTTP_INFO('👥 USUARIOS'))
        self.stdout.write(f'   Total estudiantes: {total_students}')
        self.stdout.write(f'   Grupos únicos: {grupos}')
        
        # Detalle por grupo
        grupos_detalle = User.objects.filter(
            rol=2, status=0
        ).values('group').annotate(
            count=Count('user_id')
        ).order_by('-count')
        
        if grupos_detalle:
            self.stdout.write('   Detalle por grupo:')
            for grupo in grupos_detalle:
                self.stdout.write(f'      - {grupo["group"]}: {grupo["count"]} estudiantes')
        
        self.stdout.write('')

        # 2. Transacciones
        total_trans = Transaction.objects.count()
        trans_to_check = Transaction.objects.filter(status=0).count()
        trans_checked = Transaction.objects.filter(status=1).count()
        trans_closed = Transaction.objects.filter(status=2).count()
        
        self.stdout.write(self.style.HTTP_INFO('📊 TRANSACCIONES'))
        self.stdout.write(f'   Total: {total_trans}')
        self.stdout.write(f'   Por verificar: {trans_to_check}')
        self.stdout.write(f'   Verificadas: {trans_checked}')
        self.stdout.write(f'   Cerradas: {trans_closed}')
        self.stdout.write(f'   Asientos cargados (verificadas + cerradas): {trans_checked + trans_closed}')
        self.stdout.write('')

        # 3. Cuentas
        total_accounts = Account.objects.count()
        active_accounts = Account.objects.filter(status=True).count()
        cuentas_deudoras = Account.objects.filter(nature=True).count()
        cuentas_acreedoras = Account.objects.filter(nature=False).count()
        
        self.stdout.write(self.style.HTTP_INFO('💰 CUENTAS'))
        self.stdout.write(f'   Total cuentas: {total_accounts}')
        self.stdout.write(f'   Activas: {active_accounts}')
        self.stdout.write(f'   Deudoras: {cuentas_deudoras}')
        self.stdout.write(f'   Acreedoras: {cuentas_acreedoras}')
        self.stdout.write('')

        # 4. Balance
        saldo_deudor = sum(
            acc.saldo for acc in Account.objects.filter(nature=True)
        )
        saldo_acreedor = sum(
            acc.saldo for acc in Account.objects.filter(nature=False)
        )
        
        self.stdout.write(self.style.HTTP_INFO('⚖️  BALANCE'))
        self.stdout.write(f'   Saldo Deudor: ${saldo_deudor / 100:,.2f}')
        self.stdout.write(f'   Saldo Acreedor: ${abs(saldo_acreedor) / 100:,.2f}')
        
        diferencia = saldo_deudor - abs(saldo_acreedor)
        if abs(diferencia) > 0.01:
            diferencia_pesos = diferencia / 100
            if diferencia > 0:
                self.stdout.write(self.style.WARNING(
                    f'   ⚠️  Diferencia: ${diferencia_pesos:,.2f} a favor del Saldo Deudor'
                ))
            else:
                self.stdout.write(self.style.WARNING(
                    f'   ⚠️  Diferencia: ${abs(diferencia_pesos):,.2f} a favor del Saldo Acreedor'
                ))
        else:
            self.stdout.write(self.style.SUCCESS('   ✅ Balance correcto'))

        self.stdout.write('\n' + '='*60 + '\n')