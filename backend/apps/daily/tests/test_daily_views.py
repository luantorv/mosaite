import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from apps.accounts.models import Account
from apps.trans.models import Transaction, TransactionEntry
from apps.daily.models import DailyLedger
from services.daily import daily_service

User = get_user_model()

DATE = "2026-07-24"


def _list_payload(response):
    """Devuelve la lista de resultados, con o sin paginación."""
    data = response.data
    if isinstance(data, dict) and "results" in data:
        return data["results"]
    return data


@pytest.fixture
def accountant(db):
    u = User.objects.create_user(email="acc@e.com", password="x", name="Contador", group="g1", rol=2)
    u.status = 0
    u.save()
    return u


@pytest.fixture
def accounts(db):
    caja = Account.objects.create(code="1.1.01", name="Caja", nature=True)
    ventas = Account.objects.create(code="4.1.01", name="Ventas", nature=False)
    return caja, ventas


def _make_trans(user, accounts, date=DATE, status=Transaction.STATUS_CHECKED):
    caja, ventas = accounts
    t = Transaction.objects.create(
        user=user, status=status, date=date, legend="Venta", created_at="t", updated_at="t"
    )
    TransactionEntry.objects.create(trans=t, acc=caja, debit=100000, credit=0)
    TransactionEntry.objects.create(trans=t, acc=ventas, debit=0, credit=100000)
    return t


@pytest.mark.django_db
def test_full_flow(accountant, accounts):
    client = APIClient()
    client.force_authenticate(accountant)
    t = _make_trans(accountant, accounts)

    # preview
    r = client.get(f"/api/daily/preview/?date={DATE}")
    assert r.status_code == 200
    assert r.data["transactions_count"] == 1
    assert r.data["total_debit"] == 100000
    assert r.data["already_exists"] is False

    # create
    r = client.post("/api/daily/", {"date": DATE}, format="json")
    assert r.status_code == 201, r.data
    ledger_id = r.data["ledger_id"]
    filename = r.data["pdf_filename"]
    assert r.data["transactions_count"] == 1

    # la transacción quedó cerrada y el PDF existe
    t.refresh_from_db()
    assert t.status == Transaction.STATUS_CLOSED
    assert daily_service.read_pdf(filename) is not None

    # listado
    assert len(_list_payload(client.get("/api/daily/"))) == 1

    # duplicado bloqueado
    assert client.post("/api/daily/", {"date": DATE}, format="json").status_code == 400

    # descarga del PDF
    r = client.get(f"/api/daily/{ledger_id}/download/")
    assert r.status_code == 200
    assert r["Content-Type"] == "application/pdf"

    # eliminar -> reabre transacción y borra el PDF
    r = client.delete(f"/api/daily/{ledger_id}/")
    assert r.status_code == 204
    t.refresh_from_db()
    assert t.status == Transaction.STATUS_CHECKED
    assert daily_service.read_pdf(filename) is None
    assert not DailyLedger.objects.filter(pk=ledger_id).exists()


@pytest.mark.django_db
def test_create_without_transactions_fails(accountant, accounts):
    client = APIClient()
    client.force_authenticate(accountant)
    r = client.post("/api/daily/", {"date": DATE}, format="json")
    assert r.status_code == 400


@pytest.mark.django_db
def test_viewer_cannot_create(accounts):
    viewer = User.objects.create_user(email="v@e.com", password="x", name="Viewer", group="g1", rol=4)
    viewer.status = 0
    viewer.save()
    client = APIClient()
    client.force_authenticate(viewer)
    r = client.post("/api/daily/", {"date": DATE}, format="json")
    assert r.status_code == 403


@pytest.mark.django_db
def test_group_isolation(accountant, accounts):
    client = APIClient()
    client.force_authenticate(accountant)
    _make_trans(accountant, accounts)
    r = client.post("/api/daily/", {"date": DATE}, format="json")
    assert r.status_code == 201
    filename = r.data["pdf_filename"]

    try:
        other = User.objects.create_user(email="o@e.com", password="x", name="Otro", group="g2", rol=2)
        other.status = 0
        other.save()
        c2 = APIClient()
        c2.force_authenticate(other)
        # el usuario de otro grupo no ve el libro de g1
        assert len(_list_payload(c2.get("/api/daily/"))) == 0
    finally:
        daily_service.remove_pdf(filename)
