import pytest
from datetime import datetime
from apps.trans.models import Transaction, TransactionEntry
from apps.trans.serializers import (
    TransactionSerializer,
    TransactionEntrySerializer,
    TransactionListSerializer
)
from apps.accounts.models import Account


@pytest.mark.django_db
class TestTransactionEntrySerializer:
    """Tests para TransactionEntrySerializer"""

    def test_serialize_entry(self, user):
        """Test serializar entrada"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        entry = TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=10000, credit=0
        )
        
        serializer = TransactionEntrySerializer(entry)
        data = serializer.data
        
        assert data['debit'] == 10000
        assert data['credit'] == 0
        assert data['account']['code'] == "11101"

    def test_deserialize_entry(self):
        """Test deserializar entrada"""
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'acc_id': account.acc_id,
            'debit': 10000,
            'credit': 0
        }
        
        serializer = TransactionEntrySerializer(data=data)
        assert serializer.is_valid()

    def test_validate_debit_and_credit_both(self):
        """Test validación: no puede tener débito y crédito"""
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'acc_id': account.acc_id,
            'debit': 10000,
            'credit': 5000
        }
        
        serializer = TransactionEntrySerializer(data=data)
        assert not serializer.is_valid()
        assert 'non_field_errors' in serializer.errors

    def test_validate_neither_debit_nor_credit(self):
        """Test validación: debe tener débito o crédito"""
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'acc_id': account.acc_id,
            'debit': 0,
            'credit': 0
        }
        
        serializer = TransactionEntrySerializer(data=data)
        assert not serializer.is_valid()

    def test_validate_negative_amounts(self):
        """Test validación: no permite montos negativos"""
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        data = {
            'acc_id': account.acc_id,
            'debit': -10000,
            'credit': 0
        }
        
        serializer = TransactionEntrySerializer(data=data)
        assert not serializer.is_valid()


@pytest.mark.django_db
class TestTransactionSerializer:
    """Tests para TransactionSerializer"""

    def test_serialize_transaction(self, user):
        """Test serializar transacción completa"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_TO_CHECK,
            date="2025-11-12",
            legend="Test transaction",
            created_at=now,
            updated_at=now
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
        
        serializer = TransactionSerializer(transaction)
        data = serializer.data
        
        assert data['status'] == Transaction.STATUS_TO_CHECK
        assert data['date'] == "2025-11-12"
        assert data['legend'] == "Test transaction"
        assert data['user_name'] == user.name
        assert len(data['entries']) == 2
        assert data['total_debit'] == 10000
        assert data['total_credit'] == 10000
        assert data['is_balanced'] is True

    def test_create_transaction(self, user):
        """Test crear transacción mediante serializer"""
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
        
        serializer = TransactionSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        
        transaction = serializer.save(user=user)
        
        assert transaction.trans_id is not None
        assert transaction.entries.count() == 2
        assert transaction.status == 0

    def test_validate_minimum_entries(self, user):
        """Test validación: mínimo 2 entradas"""
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
        
        serializer = TransactionSerializer(data=data)
        assert not serializer.is_valid()
        assert 'entries' in serializer.errors

    def test_validate_balanced_transaction(self, user):
        """Test validación: transacción debe estar balanceada"""
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
        
        serializer = TransactionSerializer(data=data)
        assert not serializer.is_valid()
        assert 'non_field_errors' in serializer.errors

    def test_validate_status(self):
        """Test validación de status válido"""
        data = {
            'status': 99,  # Status inválido
            'date': '2025-11-12',
            'entries': []
        }
        
        serializer = TransactionSerializer(data=data)
        assert not serializer.is_valid()
        assert 'status' in serializer.errors

    def test_update_transaction(self, user):
        """Test actualizar transacción"""
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
        
        serializer = TransactionSerializer(transaction, data=data)
        assert serializer.is_valid()
        
        updated_transaction = serializer.save()
        
        assert updated_transaction.legend == 'Updated'
        assert updated_transaction.entries.count() == 2
        # Verificar que los montos se actualizaron
        total_debit = sum(e.debit for e in updated_transaction.entries.all())
        assert total_debit == 20000

    def test_cannot_update_closed_transaction(self, user):
        """Test que no se puede actualizar transacción cerrada"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_CLOSED,  # Cerrada
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
        
        serializer = TransactionSerializer(transaction, data=data)
        with pytest.raises(Exception):  # ValidationError
            serializer.is_valid(raise_exception=True)
            serializer.save()


@pytest.mark.django_db
class TestTransactionListSerializer:
    """Tests para TransactionListSerializer"""

    def test_serialize_transaction_list(self, user):
        """Test serializar transacción en formato lista"""
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
        
        serializer = TransactionListSerializer(transaction)
        data = serializer.data
        
        assert 'user_name' in data
        assert 'entries_count' in data
        assert 'total_amount' in data
        assert 'status_display' in data
        assert data['entries_count'] == 1
        assert data['total_amount'] == 10000