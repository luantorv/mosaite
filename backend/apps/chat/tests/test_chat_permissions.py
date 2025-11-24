import pytest
from rest_framework.test import APIRequestFactory
from apps.chat.permissions import CanUseChat, CanRebuildIndex, CanViewHistory
from django.contrib.auth.models import AnonymousUser

factory = APIRequestFactory()

@pytest.mark.django_db
def test_can_use_chat_permission(user):
    perm = CanUseChat()
    req = factory.get("/")
    req.user = user
    assert perm.has_permission(req, None)
    req.user = AnonymousUser()
    assert not perm.has_permission(req, None)

@pytest.mark.django_db
def test_can_rebuild_index_permission(user):
    perm = CanRebuildIndex()
    req = factory.get("/")
    req.user = user
    # no superuser, rol distinto
    assert not perm.has_permission(req, None)
    user.rol = 0
    assert perm.has_permission(req, None)

@pytest.mark.django_db
def test_can_view_history_permission(user):
    perm = CanViewHistory()
    req = factory.get("/")
    req.user = user
    assert perm.has_permission(req, None)
    # object-level: usuario distinto
    class Dummy: pass
    other = Dummy()
    other.user = None
    assert not perm.has_object_permission(req, None, other)
    # Admin
    user.rol = 0
    assert perm.has_object_permission(req, None, other)
