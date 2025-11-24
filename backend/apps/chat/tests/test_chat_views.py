import pytest
from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from apps.chat.models import IndexStatus

@pytest.mark.django_db
@patch("apps.chat.views.rag_service")
def test_query_requires_auth(mock_rag, api_client):
    url = reverse("chat-query")
    resp = api_client.post(url, {"question": "Hola"})
    assert resp.status_code in (401, 403)

@pytest.mark.django_db
@patch("apps.chat.views.rag_service")
def test_query_success(mock_rag, api_client, user):
    mock_rag.query.return_value = {
        "answer": "Respuesta simulada",
        "sources": [{"doc": "X"}],
        "context_used": True,
    }
    IndexStatus.get_current_status()  # asegurar que exista
    mock_rag._generation_threads = [True]  # evita initialize()
    mock_rag.get_stats.return_value = {"total_vectors": 0, "total_documents": 0}

    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    resp = api_client.post(reverse("chat-query"), {"question": "¿Qué es la energía?"})
    assert resp.status_code == 200
    assert "answer" in resp.data

@pytest.mark.django_db
def test_status_endpoint_authenticated(api_client, user):
    IndexStatus.get_current_status()
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    resp = api_client.get(reverse("chat-status"))
    assert resp.status_code == 200
    assert "is_available" in resp.data

@pytest.mark.django_db
def test_rebuild_requires_admin_role(api_client, user):
    login = api_client.post(reverse("token_obtain_pair"), {"email": user.email, "password": "pass1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
    url = reverse("chat-rebuild")
    resp = api_client.post(url, {"confirm": True})
    assert resp.status_code in (403, 401)
