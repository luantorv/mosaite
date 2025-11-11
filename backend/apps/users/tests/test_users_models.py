import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_user_str_returns_email(user):
    assert str(user) == user.email

@pytest.mark.django_db
def test_user_id_alias(user):
    assert user.id == user.user_id

@pytest.mark.django_db
def test_save_updates_is_active_from_status(user):
    user.status = 1
    user.save()
    user.refresh_from_db()
    assert not user.is_active
    user.status = 0
    user.save()
    user.refresh_from_db()
    assert user.is_active
