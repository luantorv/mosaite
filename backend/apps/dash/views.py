from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Count, Sum, Q
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account
from .serializers import DashboardDataSerializer

User = get_user_model()


class DashboardStatsView(APIView):
    """
    Vista para obtener estadísticas del dashboard
    GET /api/dashboard/stats/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Obtener estadísticas completas del dashboard"""
        
        # 1. Total de alumnos (usuarios con rol Student = 2)
        total_alumnos = User.objects.filter(rol=2, status=0).count()
        
        # 2. Cantidad de grupos únicos
        grupos_unicos = User.objects.filter(
            rol=2, status=0
        ).values('group').distinct().count()
        
        # 3. Total de asientos cargados (transacciones completadas/verificadas)
        asientos_cargados = Transaction.objects.filter(
            status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED]
        ).count()
        
        # 4. Libros diarios (transacciones cerradas)
        # Por ahora contamos transacciones cerradas, cuando implementes
        # el modelo de Libro Diario, cambiarás esta query
        libros_diarios = Transaction.objects.filter(
            status=Transaction.STATUS_CLOSED
        ).count()
        
        # 5. Evolución histórica (últimos 6 meses)
        evolucion_historica = self._calcular_evolucion_historica()
        
        # 6. Actividad por grupo
        actividad_por_grupo = self._calcular_actividad_por_grupo()
        
        # 7. Alerta de balance
        alerta = self._verificar_balance_general()
        
        # Construir respuesta
        dashboard_data = {
            'total-alumnos': total_alumnos,
            'cantidad-grupos': grupos_unicos,
            'asientos-cargados': asientos_cargados,
            'libros-diarios': libros_diarios,
            'evolucionHistorica': evolucion_historica,
            'actividadPorGrupo': actividad_por_grupo,
        }
        
        if alerta:
            dashboard_data['alerta'] = alerta
        
        return Response(dashboard_data, status=status.HTTP_200_OK)
    
    def _calcular_evolucion_historica(self):
        """Calcular evolución de asientos y cobertura por mes (últimos 6 meses)"""
        meses_es = {
            1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun",
            7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"
        }
        
        # Obtener fecha hace 6 meses
        hoy = datetime.now()
        hace_6_meses = hoy - timedelta(days=180)
        
        evolucion = []
        
        # Iterar últimos 6 meses
        for i in range(6):
            fecha_inicio = hace_6_meses + timedelta(days=30*i)
            fecha_fin = fecha_inicio + timedelta(days=30)
            
            mes_numero = fecha_inicio.month
            mes_nombre = meses_es[mes_numero]
            
            # Contar asientos del mes
            asientos_mes = Transaction.objects.filter(
                date__gte=fecha_inicio.strftime('%Y-%m-%d'),
                date__lt=fecha_fin.strftime('%Y-%m-%d'),
                status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED]
            ).count()
            
            # Calcular cobertura (usuarios que crearon al menos 1 transacción)
            usuarios_activos = Transaction.objects.filter(
                date__gte=fecha_inicio.strftime('%Y-%m-%d'),
                date__lt=fecha_fin.strftime('%Y-%m-%d'),
                status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED]
            ).values('user').distinct().count()
            
            evolucion.append({
                'mes': mes_nombre,
                'asientos': asientos_mes,
                'cobertura': usuarios_activos
            })
        
        return evolucion
    
    def _calcular_actividad_por_grupo(self):
        """Calcular actividad y cobertura por grupo"""
        # Obtener todos los grupos de estudiantes
        grupos = User.objects.filter(
            rol=2, status=0
        ).values_list('group', flat=True).distinct()
        
        actividad = []
        
        for grupo in grupos:
            # Contar asientos del grupo
            usuarios_grupo = User.objects.filter(group=grupo, rol=2, status=0)
            
            asientos_grupo = Transaction.objects.filter(
                user__in=usuarios_grupo,
                status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED]
            ).count()
            
            # Cobertura: usuarios del grupo que tienen al menos 1 transacción
            usuarios_con_transacciones = Transaction.objects.filter(
                user__in=usuarios_grupo,
                status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED]
            ).values('user').distinct().count()
            
            actividad.append({
                'grupo': grupo,
                'asientos': asientos_grupo,
                'cobertura': usuarios_con_transacciones
            })
        
        # Ordenar por cantidad de asientos descendente
        actividad.sort(key=lambda x: x['asientos'], reverse=True)
        
        return actividad
    
    def _verificar_balance_general(self):
        """Verificar balance general del sistema (Activo = Pasivo + Patrimonio)"""
        
        # Calcular saldo total de cuentas deudoras (Activo)
        saldo_deudor = Account.objects.filter(
            nature=True  # Deudoras
        ).aggregate(total=Sum('saldo'))['total'] or 0
        
        # Calcular saldo total de cuentas acreedoras (Pasivo + Patrimonio)
        saldo_acreedor = Account.objects.filter(
            nature=False  # Acreedoras
        ).aggregate(total=Sum('saldo'))['total'] or 0
        
        # En contabilidad, el saldo acreedor se representa como negativo
        # por lo que debemos invertir el signo para comparar
        saldo_acreedor = abs(saldo_acreedor)
        
        diferencia = saldo_deudor - saldo_acreedor
        
        if abs(diferencia) > 0.01:  # Tolerancia de 1 centavo
            # Convertir de centavos a pesos para mostrar
            diferencia_pesos = diferencia / 100
            
            if diferencia > 0:
                return f"Hay una diferencia de ${diferencia_pesos:,.2f} a favor del Saldo Deudor"
            else:
                return f"Hay una diferencia de ${abs(diferencia_pesos):,.2f} a favor del Saldo Acreedor"
        
        return None