import pytest
from datetime import datetime
from django.core.exceptions import ValidationError
from apps.trans.models import Transaction, TransactionEntry
from apps.accounts.models import Account


@pytest.mark.django_db
class TestTransactionModel:
    """Tests para el modelo Transaction"""

    def test_create_transaction(self, user):
        """Test crear transacción básica"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_TO_CHECK,
            date="2025-11-12",
            legend="Test transaction",
            created_at=now,
            updated_at=now
        )
        
        assert transaction.trans_id is not None
        assert transaction.user == user
        assert transaction.status == Transaction.STATUS_TO_CHECK
        assert transaction.date == "2025-11-12"
        assert transaction.legend == "Test transaction"

    def test_transaction_str_representation(self, user):
        """Test representación string de transacción"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=Transaction.STATUS_TO_CHECK,
            date="2025-11-12",
            legend="Test",
            created_at=now,
            updated_at=now
        )
        
        assert "Transaction" in str(transaction)
        assert "2025-11-12" in str(transaction)

    def test_transaction_status_choices(self, user):
        """Test los diferentes estados de transacción"""
        now = datetime.now().isoformat()
        
        # Estado 0: Por verificar
        t1 = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        assert t1.status == Transaction.STATUS_TO_CHECK
        
        # Estado 1: Verificado
        t2 = Transaction.objects.create(
            user=user, status=1, date="2025-11-12",
            created_at=now, updated_at=now
        )
        assert t2.status == Transaction.STATUS_CHECKED
        
        # Estado 2: Cerrado
        t3 = Transaction.objects.create(
            user=user, status=2, date="2025-11-12",
            created_at=now, updated_at=now
        )
        assert t3.status == Transaction.STATUS_CLOSED

    def test_transaction_ordering(self, user):
        """Test que las transacciones se ordenan por fecha descendente"""
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
        
        transactions = list(Transaction.objects.all())
        
        assert transactions[0].date == "2025-11-12"
        assert transactions[1].date == "2025-11-11"
        assert transactions[2].date == "2025-11-10"

    def test_transaction_without_legend(self, user):
        """Test transacción sin leyenda (null)"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user,
            status=0,
            date="2025-11-12",
            legend=None,
            created_at=now,
            updated_at=now
        )
        
        assert transaction.legend is None


@pytest.mark.django_db
class TestTransactionEntryModel:
    """Tests para el modelo TransactionEntry"""

    def test_create_entry(self, user):
        """Test crear entrada de transacción"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        entry = TransactionEntry.objects.create(
            trans=transaction,
            acc=account,
            debit=10000,  # En centavos
            credit=0
        )
        
        assert entry.entr_id is not None
        assert entry.trans == transaction
        assert entry.acc == account
        assert entry.debit == 10000
        assert entry.credit == 0

    def test_entry_str_representation(self, user):
        """Test representación string de entrada"""
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
        
        assert "Entry" in str(entry)
        assert "Trans" in str(entry)

    def test_entry_debit_only(self, user):
        """Test entrada con solo débito"""
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
        
        assert entry.debit == 10000
        assert entry.credit == 0

    def test_entry_credit_only(self, user):
        """Test entrada con solo crédito"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="21101", name="Proveedores", saldo=0, nature=False, status=True
        )
        
        entry = TransactionEntry.objects.create(
            trans=transaction, acc=account, debit=0, credit=10000
        )
        
        assert entry.debit == 0
        assert entry.credit == 10000

    def test_entry_validation_both_debit_and_credit(self, user):
        """Test validación: no puede tener débito y crédito al mismo tiempo"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        entry = TransactionEntry(
            trans=transaction,
            acc=account,
            debit=10000,
            credit=5000  # Ambos con valor
        )
        
        with pytest.raises(ValidationError):
            entry.clean()

    def test_entry_validation_neither_debit_nor_credit(self, user):
        """Test validación: debe tener débito o crédito"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
            created_at=now, updated_at=now
        )
        
        account = Account.objects.create(
            code="11101", name="Caja MN", saldo=0, nature=True, status=True
        )
        
        entry = TransactionEntry(
            trans=transaction,
            acc=account,
            debit=0,
            credit=0  # Ambos en cero
        )
        
        with pytest.raises(ValidationError):
            entry.clean()

    def test_transaction_with_multiple_entries(self, user):
        """Test transacción con múltiples entradas"""
        now = datetime.now().isoformat()
        transaction = Transaction.objects.create(
            user=user, status=0, date="2025-11-12",
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
        
        assert transaction.entries.count() == 2

    def test_cascade_delete_transaction(self, user):
        """Test que al eliminar transacción se eliminan sus entradas"""
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
        
        assert TransactionEntry.objects.count() == 1
        
        transaction.delete()
        
        assert TransactionEntry.objects.count() == 0

    def test_protect_delete_account(self, user):
        """Test que no se puede eliminar cuenta si tiene entradas"""
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
        
        with pytest.raises(Exception):  # ProtectedError
            account.delete()