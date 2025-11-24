import pytest
from django.test import RequestFactory
from apps.config.middleware import SystemModeMiddleware
from apps.config.models import Config

@pytest.mark.django_db
def test_system_mode_middleware_sets_flag():
    factory = RequestFactory()
    request = factory.get("/")
    Config.objects.create(system_mode=True)
    middleware = SystemModeMiddleware(lambda req: None)
    middleware(request)
    assert hasattr(request, "system_mode")
    assert request.system_mode is True

@pytest.mark.django_db
def test_system_mode_middleware_handles_missing_config():
    factory = RequestFactory()
    request = factory.get("/")
    middleware = SystemModeMiddleware(lambda req: None)
    middleware(request)
    assert hasattr(request, "system_mode")
    assert request.system_mode is False
