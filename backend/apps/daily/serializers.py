from rest_framework import serializers
from .models import DailyLedger


class DailyLedgerSerializer(serializers.ModelSerializer):
    """Serializer de lectura de libros diarios."""

    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = DailyLedger
        fields = [
            'ledger_id', 'date', 'group', 'user', 'user_name',
            'pdf_filename', 'total_debit', 'total_credit',
            'transactions_count', 'created_at',
        ]
        read_only_fields = fields


class DailyLedgerCreateSerializer(serializers.Serializer):
    """Serializer de entrada para crear un libro diario a partir de una fecha."""

    date = serializers.CharField(help_text="Fecha del libro diario (YYYY-MM-DD)")
