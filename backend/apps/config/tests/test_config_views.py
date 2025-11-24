import pytest
from django.urls import reverse
from rest_framework import status
from apps.config.models import Config

@pytest.mark.django_db
def test_list_requires_auth(api_client):
    url = reverse("config-list")
    resp = api_client.get(url)
    assert resp.status_code in (401, 403)

@pytest.mark.django_db
def test_list_authenticated(api_client, user):
    # login
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    url = reverse("config-list")
    resp = api_client.get(url)
    assert resp.status_code == 200

@pytest.mark.django_db
def test_current_creates_default_config(api_client, user):
    # sin auth
    url = reverse("config-current")
    resp = api_client.get(url)
    # sin token, debería rechazar
    assert resp.status_code in (401, 403)

    # autenticado
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    resp = api_client.get(url)
    assert resp.status_code == 200
    data = resp.data
    assert "system_mode" in data
    assert Config.objects.count() == 1

@pytest.mark.django_db
def test_role_names_behavior(api_client, user):
    url = reverse("config-role-names")
    # sin auth
    resp = api_client.get(url)
    assert resp.status_code in (401, 403)

    # autenticado en modo educativo
    Config.objects.create(system_mode=False)
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    resp = api_client.get(url)
    assert resp.status_code == 200
    assert "Profesor" in resp.data.values()

    # cambiar a modo empresarial
    cfg = Config.objects.first()
    cfg.system_mode = True
    cfg.save()
    resp2 = api_client.get(url)
    assert "Admin" in resp2.data.values()
