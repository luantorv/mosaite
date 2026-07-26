import re
from datetime import datetime

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse

from services.daily import daily_service, DailyLedgerError

from apps.trans.models import Transaction
from apps.trans.serializers import TransactionSerializer

from .models import DailyLedger
from .serializers import DailyLedgerSerializer
from .permissions import CanManageDailyLedgers


def _safe_group(group: str) -> str:
    """Convierte el nombre de grupo en un fragmento seguro para nombre de archivo."""
    return re.sub(r'[^A-Za-z0-9_-]', '_', group or 'default')


class DailyLedgerViewSet(viewsets.ModelViewSet):
    """
    Gestión de libros diarios.

    - `GET    /api/daily/`               -> lista (aislada por grupo)
    - `GET    /api/daily/{id}/`          -> detalle
    - `POST   /api/daily/`               -> crea el libro diario de una fecha
    - `GET    /api/daily/preview/?date=` -> previsualiza transacciones de una fecha
    - `GET    /api/daily/{id}/download/` -> descarga el PDF
    - `DELETE /api/daily/{id}/`          -> elimina el libro y reabre sus transacciones
    """

    serializer_class = DailyLedgerSerializer
    permission_classes = [IsAuthenticated, CanManageDailyLedgers]
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_queryset(self):
        queryset = DailyLedger.objects.all().select_related('user')

        # Aislamiento por grupo: cada usuario solo ve los libros de su grupo.
        user = self.request.user
        if not user.is_superuser:
            queryset = queryset.filter(group=user.group)

        # Filtros opcionales por rango de fechas
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        return queryset

    def _eligible_transactions(self, group, date):
        """
        Transacciones de una fecha, dentro de un grupo, aptas para el libro diario:
        verificadas (1) o ya cerradas (2).
        """
        return (
            Transaction.objects
            .filter(
                user__group=group,
                date=date,
                status__in=[Transaction.STATUS_CHECKED, Transaction.STATUS_CLOSED],
            )
            .select_related('user')
            .prefetch_related('entries__acc')
        )

    @action(detail=False, methods=['get'])
    def preview(self, request):
        """Previsualiza qué transacciones entrarían en el libro diario de una fecha."""
        date = request.query_params.get('date')
        if not date:
            return Response(
                {'error': 'Se requiere el parámetro date (YYYY-MM-DD)'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        group = request.user.group
        transacciones = list(self._eligible_transactions(group, date))

        total_debit = sum(e.debit for t in transacciones for e in t.entries.all())
        total_credit = sum(e.credit for t in transacciones for e in t.entries.all())
        already_exists = DailyLedger.objects.filter(group=group, date=date).exists()

        return Response({
            'date': date,
            'transactions_count': len(transacciones),
            'total_debit': total_debit,
            'total_credit': total_credit,
            'already_exists': already_exists,
            'transactions': TransactionSerializer(transacciones, many=True).data,
        })

    def create(self, request, *args, **kwargs):
        """Crea (genera y almacena) el libro diario de una fecha."""
        date = request.data.get('date')
        if not date:
            return Response(
                {'error': 'Se requiere la fecha (date)'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        group = request.user.group

        if DailyLedger.objects.filter(group=group, date=date).exists():
            return Response(
                {'error': f'Ya existe un libro diario para el {date}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        transacciones = list(self._eligible_transactions(group, date))
        if not transacciones:
            return Response(
                {'error': f'No hay transacciones verificadas para generar el libro diario del {date}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Formato que espera el servicio (mismo shape que TransactionSerializer)
        data = TransactionSerializer(transacciones, many=True).data

        filename_stem = f"libro_diario_{_safe_group(group)}_{date}"
        try:
            info = daily_service.build_pdf(
                fecha=date,
                transacciones=data,
                autor=request.user.name,
                filename_stem=filename_stem,
            )
        except DailyLedgerError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Cerrar las transacciones incluidas en el libro diario
        Transaction.objects.filter(
            trans_id__in=[t.trans_id for t in transacciones]
        ).update(status=Transaction.STATUS_CLOSED)

        ledger = DailyLedger.objects.create(
            user=request.user,
            group=group,
            date=date,
            pdf_filename=info['filename'],
            total_debit=info['total_debit'],
            total_credit=info['total_credit'],
            transactions_count=info['transactions_count'],
            created_at=datetime.now().isoformat(timespec='seconds'),
        )

        serializer = self.get_serializer(ledger)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        """Descarga el PDF del libro diario."""
        ledger = self.get_object()
        pdf_bytes = daily_service.read_pdf(ledger.pdf_filename)
        if pdf_bytes is None:
            return Response(
                {'error': 'El PDF del libro diario no se encuentra en el almacenamiento'},
                status=status.HTTP_404_NOT_FOUND,
            )

        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{ledger.pdf_filename}"'
        return response

    def destroy(self, request, *args, **kwargs):
        """Elimina el libro diario, borra su PDF y reabre sus transacciones."""
        ledger = self.get_object()

        # Reabrir (a "verificado") las transacciones que se habían cerrado en este libro.
        Transaction.objects.filter(
            user__group=ledger.group,
            date=ledger.date,
            status=Transaction.STATUS_CLOSED,
        ).update(status=Transaction.STATUS_CHECKED)

        daily_service.remove_pdf(ledger.pdf_filename)
        ledger.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
