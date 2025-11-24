import pytest
from apps.users.serializers import UserSerializer  # ajusta si tu serializer tiene otro nombre
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_user_serializer_validates_and_serializes(user):
    data = {
        "email": user.email,
        "name": user.name,
        "group": user.group,
        "rol": user.rol,
        "status": user.status,
    }
    serializer = UserSerializer(instance=user)
    serialized = serializer.data
    for field in data:
        assert serialized[field] == data[field]
