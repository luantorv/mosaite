import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

@pytest.fixture
def api_client():
    """Cliente DRF para peticiones HTTP."""
    return APIClient()

@pytest.fixture
def user_data():
    """Datos base para creación de usuario."""
    return {
        "email": "test@example.com",
        "name": "Test User",
        "password": "pass1234",
        "group": "default",
        "rol": 1,
        "status": 0,
    }

@pytest.fixture
def user(db, user_data):
    """Crea un usuario en BD."""
    User = get_user_model()
    obj = User.objects.create_user(
        email=user_data["email"],
        password=user_data["password"],
        name=user_data["name"],
        group=user_data["group"],
        rol=user_data["rol"],
    )
    obj.status = 0
    obj.save()
    return obj
