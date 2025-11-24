import pytest
from datetime import datetime
from rest_framework import status
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account


@pytest.mark.django_db(transaction=True)
class TestTransactionViewSet:
    """Tests para TransactionViewSet"""

    def test_list_transactions_unauthenticated(self, api_client):
        """Test listar transacciones sin autenticación"""
        response = api_client.get('/api/trans/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_list_transactions_authenticated(self, api_client, user):
        """Test listar transacciones autenticado"""
        api_client.force_authenticate(user=user)
        
        # Limpiar transacciones existentes
        Transaction.objects.all().delete()
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-11",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2

    def test_create_transaction(self, api_client, user):
        """Test crear transacción"""
        api_client.force_authenticate(user=user)
        
        account1 = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        account2 = Account.objects.create(
            code="21101", name="Proveedores", saldo=0, nature=False, status=True
        )
        
        data = {
            'status': 0,
            'date': '2025-11-12',
            'legend': 'Test transaction',
            'entries': [
                {'acc_id': account1.acc_id, 'debit': 10000, 'credit': 0},
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 10000}
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['legend'] == 'Test transaction'
        assert Transaction.objects.count() == 1
        assert TransactionEntry.objects.count() == 2

    def test_create_unbalanced_transaction(self, api_client, user):
        """Test crear transacción desbalanceada (debe fallar)"""
        api_client.force_authenticate(user=user)
        
        account1 = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        account2 = Account.objects.create(
            code="21101", name="Proveedores", saldo=0, nature=False, status=True
        )
        
        data = {
            'status': 0,
            'date': '2025-11-12',
            'entries': [
                {'acc_id': account1.acc_id, 'debit': 10000, 'credit': 0},
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 5000}  # Desbalanceada
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_create_transaction_with_one_entry(self, api_client, user):
        """Test crear transacción con una sola entrada (debe fallar)"""
        api_client.force_authenticate(user=user)
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'status': 0,
            'date': '2025-11-12',
            'entries': [
                {'acc_id': account.acc_id, 'debit': 10000, 'credit': 0}
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_get_transaction_detail(self, api_client, user):
        """Test obtener detalle de transacción"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            legend="Test", created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        response = api_client.get(f'/api/trans/{transaction.trans_id}/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['legend'] == 'Test'
        assert len(response.data['entries']) == 2

    def test_update_transaction(self, api_client, user):
        """Test actualizar transacción"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            legend="Original", created_at=now, updated_at=now
        )
        
        account1 = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        account2 = Account.objects.create(
            code="21101", name="Proveedores", saldo=0, nature=False, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account1, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account2, debit=0, credit=10000
        )
        
        data = {
            'status': 0,
            'date': '2025-11-12',
            'legend': 'Updated',
            'entries': [
                {'acc_id': account1.acc_id, 'debit': 20000, 'credit': 0},
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 20000}
            ]
        }
        
        response = api_client.patch(
            f'/api/trans/{transaction.trans_id}/', data, format='json'
        )
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['legend'] == 'Updated'

    def test_cannot_update_closed_transaction(self, api_client, user):
        """Test que no se puede actualizar transacción cerrada"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_CLOSED,
            date="2025-11-12",
            created_at=now,
            updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        data = {
            'status': 2,
            'date': '2025-11-12',
            'legend': 'Updated',
            'entries': [
                {'acc_id': account.acc_id, 'debit': 20000, 'credit': 0},
                {'acc_id': account.acc_id, 'debit': 0, 'credit': 20000}
            ]
        }
        
        response = api_client.patch(
            f'/api/trans/{transaction.trans_id}/', data, format='json'
        )
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_delete_transaction(self, api_client, user):
        """Test eliminar transacción"""
        api_client.force_authenticate(user=user)
        
        # Cambiar rol del usuario a Admin (0) para poder eliminar
        user.rol = 0
        user.save()
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        
        response = api_client.delete(f'/api/trans/{transaction.trans_id}/')
        
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Transaction.objects.count() == 0
        assert TransactionEntry.objects.count() == 0

    def test_filter_by_status(self, api_client, user):
        """Test filtrar transacciones por estado"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=1, date="2025-11-11",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/?status=0')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['status'] == 0

    def test_filter_by_date_range(self, api_client, user):
        """Test filtrar transacciones por rango de fechas"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=user, status=0, date="2025-11-10",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-15",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/?date_from=2025-11-11&date_to=2025-11-13')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['date'] == "2025-11-12"

    def test_search_transactions(self, api_client, user):
        """Test buscar transacciones por leyenda"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            legend="Compra de materiales", created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-11",
            legend="Venta de productos", created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/?search=materiales')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert "materiales" in response.data[0]['legend']

    def test_get_recent_transactions(self, api_client, user):
        """Test obtener transacciones recientes"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        for i in range(15):
            Transaction.objects.create(
                user=user, status=0, date=f"2025-11-{i+1:02d}",
                created_at=now, updated_at=now
            )
        
        response = api_client.get('/api/trans/recent/?limit=5')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 5

    def test_toggle_status(self, api_client, user):
        """Test cambiar estado de transacción"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        # Cambiar de 0 a 1
        response = api_client.post(f'/api/trans/{transaction.trans_id}/toggle_status/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 1
        
        # Cambiar de 1 a 0
        response = api_client.post(f'/api/trans/{transaction.trans_id}/toggle_status/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 0

    def test_cannot_toggle_closed_transaction(self, api_client, user):
        """Test que no se puede cambiar estado de transacción cerrada"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_CLOSED,
            date="2025-11-12",
            created_at=now,
            updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        response = api_client.post(f'/api/trans/{transaction.trans_id}/toggle_status/')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_close_transaction(self, api_client, user):
        """Test cerrar transacción"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        response = api_client.post(f'/api/trans/{transaction.trans_id}/close/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == Transaction.STATUS_CLOSED

    def test_transactions_ordered_by_date_desc(self, api_client, user):
        """Test que las transacciones se devuelven ordenadas por fecha descendente"""
        api_client.force_authenticate(user=user)
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=user, status=0, date="2025-11-10",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        Transaction.objects.create(
            user=user, status=0, date="2025-11-11",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data[0]['date'] == "2025-11-12"
        assert response.data[1]['date'] == "2025-11-11"
        assert response.data[2]['date'] == "2025-11-10"