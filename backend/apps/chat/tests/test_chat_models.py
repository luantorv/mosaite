import pytest
from apps.chat.models import ChatQuery, IndexStatus
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_chatquery_str_representation(user):
    q = ChatQuery.objects.create(
        user=user,
        question="¿Qué es la energía?",
        answer="La energía es...",
        sources=[],
        context_used=False,
        created_at="2025-01-01T00:00:00",
    )
    assert str(q) == f"Query {q.query_id} - {user.email}"

@pytest.mark.django_db
def test_indexstatus_str_and_get_current():
    status = IndexStatus.get_current_status()
    assert isinstance(status, IndexStatus)
    assert "Available" in str(status)

@pytest.mark.django_db
def test_indexstatus_unique():
    s1 = IndexStatus.get_current_status()
    s2 = IndexStatus.get_current_status()
    assert s1.pk == s2.pk  # siempre el mismo registro
