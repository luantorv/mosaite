from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Config

User = get_user_model()


class ConfigModelTestCase(TestCase):
    """Tests para el modelo Config"""
    
    def setUp(self):
        self.config = Config.objects.create(
            company_name="Test Company",
            system_mode=True,
            date_format="DD/MM/YYYY",
            currency="USD"
        )
    
    def test_config_creation(self):
        """Test de creación de configuración"""
        self.assertEqual(self.config.company_name, "Test Company")
        self.assertTrue(self.config.system_mode)
        self.assertEqual(self.config.date_format, "DD/MM/YYYY")
        self.assertEqual(self.config.currency, "USD")
    
    def test_get_config_classmethod(self):
        """Test del método get_config"""
        config = Config.get_config()
        self.assertIsNotNone(config)
        self.assertEqual(config.company_name, "Test Company")
    
    def test_get_individual_fields(self):
        """Test de métodos para obtener campos individuales"""
        self.assertEqual(Config.get_company_name(), "Test Company")
        self.assertTrue(Config.get_system_mode())
        self.assertEqual(Config.get_date_format(), "DD/MM/YYYY")
        self.assertEqual(Config.get_currency(), "USD")


class ConfigViewTestCase(TestCase):
    """Tests para las vistas de Config"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        self.config = Config.objects.create(
            company_name="Test Company",
            system_mode=True,
            date_format="DD/MM/YYYY",
            currency="USD"
        )
        self.client.force_authenticate(user=self.user)
    
    def test_get_config(self):
        """Test GET /config/"""
        response = self.client.get('/config/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company_name'], "Test Company")
    
    def test_put_config(self):
        """Test PUT /config/"""
        data = {
            'company_name': 'Updated Company',
            'currency': 'EUR'
        }
        response = self.client.put('/config/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company_name'], 'Updated Company')
        self.assertEqual(response.data['currency'], 'EUR')
        
        # Verificar que se actualizó en la BD
        self.config.refresh_from_db()
        self.assertEqual(self.config.company_name, 'Updated Company')
    
    def test_get_config_not_authenticated(self):
        """Test GET sin autenticación"""
        self.client.force_authenticate(user=None)
        response = self.client.get('/config/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)