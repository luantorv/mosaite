import pytest
from apps.accounts.models import Account


@pytest.mark.django_db
class TestAccountModel:
    """Tests para el modelo Account"""

    def test_create_account(self):
        """Test crear cuenta básica"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=0,
            nature=True,  # Deudora
            status=True
        )
        
        assert account.acc_id is not None
        assert account.code == "11101"
        assert account.name == "Caja MN"
        assert account.saldo == 0
        assert account.nature is True
        assert account.status is True

    def test_account_str_representation(self):
        """Test representación string de cuenta"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=0,
            nature=True,
            status=True
        )
        
        assert str(account) == "11101 - Caja MN"

    def test_account_unique_code(self):
        """Test que el código de cuenta sea único"""
        Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=0,
            nature=True,
            status=True
        )
        
        with pytest.raises(Exception):  # IntegrityError
            Account.objects.create(
                code="11101",  # Código duplicado
                name="Otra Cuenta",
                saldo=0,
                nature=True,
                status=True
            )

    def test_account_nature_deudora(self):
        """Test cuenta de naturaleza deudora"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=10000,
            nature=True,  # Deudora
            status=True
        )
        
        assert account.nature is True

    def test_account_nature_acreedora(self):
        """Test cuenta de naturaleza acreedora"""
        account = Account.objects.create(
            code="21101",
            name="Proveedores",
            saldo=5000,
            nature=False,  # Acreedora
            status=True
        )
        
        assert account.nature is False

    def test_account_inactive(self):
        """Test cuenta inactiva"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=0,
            nature=True,
            status=False  # Inactiva
        )
        
        assert account.status is False

    def test_account_ordering(self):
        """Test que las cuentas se ordenan por código"""
        Account.objects.create(code="11103", name="C", saldo=0, nature=True, status=True)
        Account.objects.create(code="11101", name="A", saldo=0, nature=True, status=True)
        Account.objects.create(code="11102", name="B", saldo=0, nature=True, status=True)
        
        accounts = list(Account.objects.all())
        
        assert accounts[0].code == "11101"
        assert accounts[1].code == "11102"
        assert accounts[2].code == "11103"

    def test_account_negative_saldo(self):
        """Test cuenta con saldo negativo (válido en contabilidad)"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=-5000,
            nature=True,
            status=True
        )
        
        assert account.saldo == -5000

    def test_account_update_saldo(self):
        """Test actualizar saldo de cuenta"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=0,
            nature=True,
            status=True
        )
        
        account.saldo = 10000
        account.save()
        
        account.refresh_from_db()
        assert account.saldo == 10000