import pytest
from apps.config.models import Config

@pytest.mark.django_db
def test_config_str_representation():
    cfg = Config.objects.create(system_mode=True, date_format='YYYY-MM-DD', currency='USD')
    assert "Empresarial" in str(cfg)

@pytest.mark.django_db
def test_config_str_representation_educational():
    cfg = Config.objects.create(system_mode=False)
    assert "Educativo" in str(cfg)

@pytest.mark.django_db
def test_config_unique_enforced():
    Config.objects.create(system_mode=False)
    with pytest.raises(ValueError):
        Config.objects.create(system_mode=True)
