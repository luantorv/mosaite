import pytest
from apps.chat.serializers import (
    ChatRequestSerializer,
    ChatResponseSerializer,
    IndexStatusSerializer,
    RebuildIndexSerializer,
)
from apps.chat.models import IndexStatus

@pytest.mark.parametrize("question,valid", [
    ("Hola", True),
    ("  ok ", True),
    ("no", False),
])
def test_chat_request_serializer_validation(question, valid):
    ser = ChatRequestSerializer(data={"question": question})
    if valid:
        assert ser.is_valid()
    else:
        assert not ser.is_valid()

def test_chat_response_serializer_valid():
    data = {
        "answer": "respuesta",
        "sources": [{"doc": "X"}],
        "context_used": True,
        "response_time": 0.5,
        "query_id": 1
    }
    ser = ChatResponseSerializer(data=data)
    assert ser.is_valid()

@pytest.mark.django_db
def test_indexstatus_serializer_fields(user):
    status = IndexStatus.objects.create(
        is_available=True,
        is_rebuilding=False,
        rebuild_by=user
    )
    ser = IndexStatusSerializer(instance=status)
    assert "rebuild_by_name" in ser.data
    assert ser.data["rebuild_by_name"] == user.name

def test_rebuildindex_serializer_confirm():
    ser_ok = RebuildIndexSerializer(data={"confirm": True})
    ser_bad = RebuildIndexSerializer(data={"confirm": False})
    assert ser_ok.is_valid()
    assert not ser_bad.is_valid()
