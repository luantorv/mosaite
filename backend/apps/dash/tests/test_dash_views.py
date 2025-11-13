import pytest
from datetime import datetime
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account

User = get_user_model()


@pytest.mark.django_db
class TestDashboardStatsView:
    """Tests para el endpoint de estadísticas del dashboard"""

    def test_get_dashboard_stats_unauthenticated(self, api_client):
        """Test obtener stats sin autenticación"""
        response = api_client.get('/api/dashboard/stats/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_dashboard_stats_authenticated(self, api_client, user):
        """Test obtener stats autenticado"""
        api_client.force_authenticate(user=user)
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert 'total-alumnos' in response.data
        assert 'cantidad-grupos' in response.data
        assert 'asientos-cargados' in response.data
        assert 'libros-diarios' in response.data
        assert 'evolucionHistorica' in response.data
        assert 'actividadPorGrupo' in response.data

    def test_total_alumnos_count(self, api_client, user):
        """Test contar total de alumnos"""
        api_client.force_authenticate(user=user)
        
        # Crear estudiantes
        User.objects.create_user(
            email="student1@test.com",
            password="pass",
            name="Student 1",
            group="Grupo A",
            rol=2,  # Student
            status=0
        )
        User.objects.create_user(
            email="student2@test.com",
            password="pass",
            name="Student 2",
            group="Grupo A",
            rol=2,
            status=0
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['total-alumnos'] == 2

    def test_cantidad_grupos(self, api_client, user):
        """Test contar grupos únicos"""
        api_client.force_authenticate(user=user)
        
        # Crear estudiantes en diferentes grupos
        User.objects.create_user(
            email="student1@test.com",
            password="pass",
            name="Student 1",
            group="Grupo A",
            rol=2,
            status=0
        )
        User.objects.create_user(
            email="student2@test.com",
            password="pass",
            name="Student 2",
            group="Grupo B",
            rol=2,
            status=0
        )
        User.objects.create_user(
            email="student3@test.com",
            password="pass",
            name="Student 3",
            group="Grupo A",  # Mismo grupo que student1
            rol=2,
            status=0
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['cantidad-grupos'] == 2

    def test_asientos_cargados(self, api_client, user):
        """Test contar asientos cargados (verificados o cerrados)"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        
        # Crear transacciones con diferentes estados
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )  # No cuenta (to check)
        
        Transaction.objects.create(
            user=user, status=1, date="2025-11-12",
            created_at=now, updated_at=now
        )  # Cuenta (checked)
        
        Transaction.objects.create(
            user=user, status=2, date="2025-11-12",
            created_at=now, updated_at=now
        )  # Cuenta (closed)
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['asientos-cargados'] == 2

    def test_libros_diarios_count(self, api_client, user):
        """Test contar libros diarios (transacciones cerradas)"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=2, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=2, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['libros-diarios'] == 2

    def test_evolucion_historica_structure(self, api_client, user):
        """Test estructura de evolución histórica"""
        api_client.force_authenticate(user=user)
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['evolucionHistorica']) == 6
        
        # Verificar estructura de cada elemento
        for item in response.data['evolucionHistorica']:
            assert 'mes' in item
            assert 'asientos' in item
            assert 'cobertura' in item

    def test_actividad_por_grupo_structure(self, api_client, user):
        """Test estructura de actividad por grupo"""
        api_client.force_authenticate(user=user)
        
        # Crear estudiante con grupo
        student = User.objects.create_user(
            email="student@test.com",
            password="pass",
            name="Student",
            group="Grupo A",
            rol=2,
            status=0
        )
        
        # Crear transacción del estudiante
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=student, status=1, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['actividadPorGrupo']) > 0
        
        # Verificar estructura
        for item in response.data['actividadPorGrupo']:
            assert 'grupo' in item
            assert 'asientos' in item
            assert 'cobertura' in item

    def test_alerta_balance_when_balanced(self, api_client, user):
        """Test que no hay alerta cuando está balanceado"""
        api_client.force_authenticate(user=user)
        
        # Crear cuentas balanceadas
        Account.objects.create(
            code="11101", name="Activo", saldo=100000, nature=True, status=True
        )
        Account.objects.create(
            code="21101", name="Pasivo", saldo=-100000, nature=False, status=True
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        # No debe haber campo 'alerta' o debe ser None
        assert 'alerta' not in response.data or response.data.get('alerta') is None

    def test_alerta_balance_when_unbalanced(self, api_client, user):
        """Test alerta cuando hay desbalance"""
        api_client.force_authenticate(user=user)
        
        # Crear cuentas desbalanceadas
        Account.objects.create(
            code="11101", name="Activo", saldo=150000, nature=True, status=True
        )
        Account.objects.create(
            code="21101", name="Pasivo", saldo=-100000, nature=False, status=True
        )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        assert 'alerta' in response.data
        assert 'diferencia' in response.data['alerta'].lower()

    def test_actividad_ordenada_por_asientos(self, api_client, user):
        """Test que actividad por grupo está ordenada por cantidad de asientos"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        
        # Grupo A: 2 transacciones
        student_a = User.objects.create_user(
            email="studentA@test.com",
            password="pass",
            name="Student A",
            group="Grupo A",
            rol=2,
            status=0
        )
        Transaction.objects.create(
            user=student_a, status=1, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=student_a, status=1, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        # Grupo B: 5 transacciones
        student_b = User.objects.create_user(
            email="studentB@test.com",
            password="pass",
            name="Student B",
            group="Grupo B",
            rol=2,
            status=0
        )
        for i in range(5):
            Transaction.objects.create(
                user=student_b, status=1, date="2025-11-12",
                created_at=now, updated_at=now
            )
        
        response = api_client.get('/api/dashboard/stats/')
        
        assert response.status_code == status.HTTP_200_OK
        actividad = response.data['actividadPorGrupo']
        
        # Grupo B debe estar primero (más asientos)
        assert actividad[0]['grupo'] == 'Grupo B'
        assert actividad[0]['asientos'] == 5
        assert actividad[1]['grupo'] == 'Grupo A'
        assert actividad[1]['asientos'] == 2