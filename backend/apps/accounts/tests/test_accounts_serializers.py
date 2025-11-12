import pytest
from apps.accounts.models import Account
from apps.accounts.serializers import AccountSerializer, AccountListSerializer


@pytest.mark.django_db
class TestAccountSerializer:
    """Tests para AccountSerializer"""

    def test_serialize_account(self):
        """Test serializar una cuenta"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=10000,
            nature=True,
            status=True
        )
        
        serializer = AccountSerializer(account)
        data = serializer.data
        
        assert data['code'] == "11101"
        assert data['name'] == "Caja MN"
        assert data['saldo'] == 10000
        assert data['nature'] is True
        assert data['status'] is True

    def test_deserialize_account(self):
        """Test deserializar y crear cuenta"""
        data = {
            'code': '11101',
            'name': 'Caja MN',
            'nature': True,
            'status': True
        }
        
        serializer = AccountSerializer(data=data)
        assert serializer.is_valid()
        
        account = serializer.save()
        assert account.code == '11101'
        assert account.name == 'Caja MN'
        assert account.saldo == 0  # Default
        assert account.nature is True

    def test_saldo_readonly(self):
        """Test que el saldo sea read-only"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=10000,
            nature=True,
            status=True
        )
        
        data = {
            'code': '11101',
            'name': 'Caja MN',
            'saldo': 99999,  # Intentar cambiar saldo
            'nature': True,
            'status': True
        }
        
        serializer = AccountSerializer(account, data=data)
        assert serializer.is_valid()
        
        updated_account = serializer.save()
        # El saldo no debe cambiar
        assert updated_account.saldo == 10000

    def test_acc_id_readonly(self):
        """Test que acc_id sea read-only"""
        serializer = AccountSerializer()
        assert 'acc_id' in serializer.fields
        assert serializer.fields['acc_id'].read_only is True


@pytest.mark.django_db
class TestAccountListSerializer:
    """Tests para AccountListSerializer"""

    def test_serialize_account_list(self):
        """Test serializar cuenta con nature_display"""
        account = Account.objects.create(
            code="11101",
            name="Caja MN",
            saldo=10000,
            nature=True,
            status=True
        )
        
        serializer = AccountListSerializer(account)
        data = serializer.data
        
        assert data['code'] == "11101"
        assert data['nature_display'] == 'Deudora'

    def test_nature_display_acreedora(self):
        """Test nature_display para cuenta acreedora"""
        account = Account.objects.create(
            code="21101",
            name="Proveedores",
            saldo=5000,
            nature=False,
            status=True
        )
        
        serializer = AccountListSerializer(account)
        data = serializer.data
        
        assert data['nature_display'] == 'Acreedora'

    def test_serialize_multiple_accounts(self):
        """Test serializar múltiples cuentas"""
        Account.objects.create(
            code="11101", name="Caja MN", saldo=10000, nature=True, status=True
        )
        Account.objects.create(
            code="21101", name="Proveedores", saldo=5000, nature=False, status=True
        )
        
        accounts = Account.objects.all()
        serializer = AccountListSerializer(accounts, many=True)
        data = serializer.data
        
        assert len(data) == 2
        assert data[0]['nature_display'] in ['Deudora', 'Acreedora']