import pytest
from rest_framework import status
from apps.accounts.models import Account


@pytest.mark.django_db(transaction=True)
class TestAccountViewSet:
    """Tests para AccountViewSet"""

    def test_list_accounts_unauthenticated(self, api_client):
        """Test listar cuentas sin autenticación"""
        response = api_client.get('/api/accounts/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_list_accounts_authenticated(self, api_client, user):
        """Test listar cuentas autenticado"""
        api_client.force_authenticate(user=user)
        
        # Limpiar cuentas existentes y crear solo las del test
        Account.objects.all().delete()
        
        Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        Account.objects.create(
            code="11102", name="Caja ME", saldo=0, nature=True, status=True
        )
        
        response = api_client.get('/api/accounts/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2

    def test_create_account(self, api_client, user):
        """Test crear cuenta"""
        api_client.force_authenticate(user=user)
        
        data = {
            'code': '11101',
            'name': 'Caja MN',
            'nature': True,
            'status': True
        }
        
        response = api_client.post('/api/accounts/', data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['code'] == '11101'
        assert response.data['name'] == 'Caja MN'
        assert Account.objects.count() == 1

    def test_get_account_detail(self, api_client, user):
        """Test obtener detalle de cuenta"""
        api_client.force_authenticate(user=user)
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=10000, nature=True, status=True
        )
        
        response = api_client.get(f'/api/accounts/{account.acc_id}/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['code'] == '11101'
        assert response.data['saldo'] == 10000

    def test_update_account(self, api_client, user):
        """Test actualizar cuenta"""
        api_client.force_authenticate(user=user)
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'code': '11101',
            'name': 'Caja Moneda Nacional',  # Nuevo nombre
            'nature': True,
            'status': True
        }
        
        response = api_client.patch(f'/api/accounts/{account.acc_id}/', data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Caja Moneda Nacional'

    def test_delete_account(self, api_client, user):
        """Test eliminar cuenta"""
        api_client.force_authenticate(user=user)
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        response = api_client.delete(f'/api/accounts/{account.acc_id}/')
        
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Account.objects.count() == 0

    def test_filter_accounts_by_status(self, api_client, user):
        """Test filtrar cuentas por estado"""
        api_client.force_authenticate(user=user)
        
        Account.objects.create(
            code="11101", name="Activa", saldo=0, nature=True, status=True
        )
        Account.objects.create(
            code="11102", name="Inactiva", saldo=0, nature=True, status=False
        )
        
        response = api_client.get('/api/accounts/?status=true')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Activa'

    def test_filter_accounts_by_nature(self, api_client, user):
        """Test filtrar cuentas por naturaleza"""
        api_client.force_authenticate(user=user)
        
        Account.objects.create(
            code="11101", name="Deudora", saldo=0, nature=True, status=True
        )
        Account.objects.create(
            code="21101", name="Acreedora", saldo=0, nature=False, status=True
        )
        
        response = api_client.get('/api/accounts/?nature=false')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Acreedora'

    def test_search_accounts(self, api_client, user):
        """Test buscar cuentas por código o nombre"""
        api_client.force_authenticate(user=user)
        
        Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        Account.objects.create(
            code="11102", name="Banco", saldo=0, nature=True, status=True
        )
        
        response = api_client.get('/api/accounts/?search=banco')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Banco'

    def test_get_active_accounts(self, api_client, user):
        """Test obtener solo cuentas activas mediante endpoint /active/"""
        api_client.force_authenticate(user=user)
        
        Account.objects.create(
            code="11101", name="Activa", saldo=0, nature=True, status=True
        )
        Account.objects.create(
            code="11102", name="Inactiva", saldo=0, nature=True, status=False
        )
        
        response = api_client.get('/api/accounts/active/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Activa'

    def test_accounts_ordered_by_code(self, api_client, user):
        """Test que las cuentas se devuelvan ordenadas por código"""
        api_client.force_authenticate(user=user)
        
        Account.objects.create(code="11103", name="C", saldo=0, nature=True, status=True)
        Account.objects.create(code="11101", name="A", saldo=0, nature=True, status=True)
        Account.objects.create(code="11102", name="B", saldo=0, nature=True, status=True)
        
        response = api_client.get('/api/accounts/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data[0]['code'] == '11101'
        assert response.data[1]['code'] == '11102'
        assert response.data[2]['code'] == '11103'