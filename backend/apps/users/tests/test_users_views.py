import pytest
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_login_success(api_client, user):
    url = reverse("token_obtain_pair")
    resp = api_client.post(url, {"email": user.email, "password": "pass1234"})
    assert resp.status_code == status.HTTP_200_OK
    assert "access" in resp.data and "refresh" in resp.data

@pytest.mark.django_db
def test_login_invalid_credentials(api_client):
    url = reverse("token_obtain_pair")
    resp = api_client.post(url, {"email": "wrong@example.com", "password": "bad"})
    assert resp.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_token_refresh(api_client, user):
    login_url = reverse("token_obtain_pair")
    refresh_url = reverse("token_refresh")
    login = api_client.post(login_url, {"email": user.email, "password": "pass1234"})
    token = login.data["refresh"]
    resp = api_client.post(refresh_url, {"refresh": token})
    assert resp.status_code == 200
    assert "access" in resp.data

@pytest.mark.django_db
def test_logout_blacklists_token(api_client, user):
    login_url = reverse("token_obtain_pair")
    logout_url = reverse("logout")
    login = api_client.post(login_url, {"email": user.email, "password": "pass1234"})
    token = login.data["refresh"]
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    resp = api_client.post(logout_url, {"refresh_token": token})
    assert resp.status_code in (200, 205)

# --- CRUD endpoints ---
@pytest.mark.django_db
def test_list_users_requires_auth(api_client):
    url = reverse("user-list")
    resp = api_client.get(url)
    assert resp.status_code in (401, 403)

@pytest.mark.django_db
def test_list_users_authenticated(api_client, user):
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    url = reverse("user-list")
    resp = api_client.get(url)
    assert resp.status_code == 200

@pytest.mark.django_db
def test_create_user(api_client, user):
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    url = reverse("user-list")
    new_user = {
        "email": "newuser@example.com",
        "name": "New User",
        "password": "newpass123",
        "group": "default",
        "rol": 2,
        "status": 0,
    }
    resp = api_client.post(url, new_user)
    assert resp.status_code in (201, 200)
    assert User.objects.filter(email="newuser@example.com").exists()
