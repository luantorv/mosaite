import pytest
from datetime import datetime
from rest_framework import status
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestTransactionPermissions:
    """Tests para permisos de transacciones"""

    def test_viewer_cannot_create_transaction(self, api_client):
        """Test que rol Viewer (4) no puede crear transacciones"""
        viewer = User.objects.create_user(
            email="viewer@test.com",
            password="pass1234",
            name="Viewer",
            group="default",
            rol=4  # Viewer
        )
        
        api_client.force_authenticate(user=viewer)
        
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
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 10000}
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_student_can_create_transaction(self, api_client):
        """Test que Student (3) puede crear transacciones"""
        student = User.objects.create_user(
            email="student@test.com",
            password="pass1234",
            name="Student",
            group="default",
            rol=3  # Student
        )
        
        api_client.force_authenticate(user=student)
        
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
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 10000}
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED

    def test_accountant_can_edit_transaction(self, api_client):
        """Test que Accountant (2) puede editar transacciones"""
        accountant = User.objects.create_user(
            email="accountant@test.com",
            password="pass1234",
            name="Accountant",
            group="default",
            rol=2  # Accountant
        )
        
        api_client.force_authenticate(user=accountant)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=accountant, status=0, date="2025-11-12",
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
            'legend': 'Updated by Accountant',
            'entries': [
                {'acc_id': account1.acc_id, 'debit': 15000, 'credit': 0},
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 15000}
            ]
        }
        
        response = api_client.patch(
            f'/api/trans/{transaction.trans_id}/', data, format='json'
        )
        
        assert response.status_code == status.HTTP_200_OK

    def test_student_cannot_edit_transaction(self, api_client):
        """Test que Student (3) no puede editar transacciones"""
        student = User.objects.create_user(
            email="student@test.com",
            password="pass1234",
            name="Student",
            group="default",
            rol=3  # Student
        )
        
        api_client.force_authenticate(user=student)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=student, status=0, date="2025-11-12",
            created_at=now, updated_at=now
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
            'legend': 'Trying to update',
            'entries': [
                {'acc_id': account1.acc_id, 'debit': 15000, 'credit': 0},
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 15000}
            ]
        }
        
        response = api_client.patch(
            f'/api/trans/{transaction.trans_id}/', data, format='json'
        )
        
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_only_admin_can_delete_transaction(self, api_client):
        """Test que solo Admin (0) puede eliminar transacciones"""
        accountant = User.objects.create_user(
            email="accountant@test.com",
            password="pass1234",
            name="Accountant",
            group="default",
            rol=2  # Accountant
        )
        
        api_client.force_authenticate(user=accountant)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=accountant, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        
        response = api_client.delete(f'/api/trans/{transaction.trans_id}/')
        
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_delete_transaction(self, api_client):
        """Test que Admin (0) puede eliminar transacciones"""
        admin = User.objects.create_user(
            email="admin@test.com",
            password="pass1234",
            name="Admin",
            group="default",
            rol=0  # Admin
        )
        
        api_client.force_authenticate(user=admin)
        
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=admin, status=0, date="2025-11-12",
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

    def test_all_roles_can_view_transactions(self, api_client):
        """Test que todos los roles pueden ver transacciones"""
        viewer = User.objects.create_user(
            email="viewer@test.com",
            password="pass1234",
            name="Viewer",
            group="default",
            rol=4  # Viewer
        )
        
        api_client.force_authenticate(user=viewer)
        
        now = datetime.now().isoformat()
        Transaction.objects.create(
            user=viewer, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        response = api_client.get('/api/trans/')
        
        assert response.status_code == status.HTTP_200_OK

    def test_superuser_has_all_permissions(self, api_client):
        """Test que superuser tiene todos los permisos"""
        superuser = User.objects.create_superuser(
            email="super@test.com",
            password="pass1234",
            name="Super",
            group="default"
        )
        
        api_client.force_authenticate(user=superuser)
        
        # Crear
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
                {'acc_id': account2.acc_id, 'debit': 0, 'credit': 10000}
            ]
        }
        
        response = api_client.post('/api/trans/', data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        
        trans_id = response.data['trans_id']
        
        # Editar
        data['legend'] = 'Updated'
        response = api_client.patch(f'/api/trans/{trans_id}/', data, format='json')
        assert response.status_code == status.HTTP_200_OK
        
        # Eliminar
        response = api_client.delete(f'/api/trans/{trans_id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT