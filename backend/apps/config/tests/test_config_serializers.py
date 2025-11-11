import pytest
from apps.config.serializers import ConfigSerializer
from apps.config.models import Config

@pytest.mark.django_db
def test_config_serializer_validates_fields():
    cfg = Config.objects.create(system_mode=False, date_format="DD/MM/YYYY", currency="ARS")
    serializer = ConfigSerializer(instance=cfg)
    data = serializer.data
    assert data["system_mode"] is False
    assert data["currency"] == "ARS"
    assert "date_format" in data
