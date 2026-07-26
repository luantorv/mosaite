from django.db import models
from apps.users.models import User


class DailyLedger(models.Model):
    """
    Libro diario.

    Agrupa todas las transacciones de una fecha (dentro de un grupo/tenant) en un
    PDF generado y almacenado por el servicio `services.daily`. Este modelo es la
    fuente de verdad de los metadatos; el archivo PDF vive en el almacenamiento
    del servicio y se referencia por `pdf_filename`.

    Existe como máximo un libro diario por (grupo, fecha).
    """

    ledger_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='daily_ledgers',
    )
    group = models.TextField()  # tenant, copiado de user.group al crear
    date = models.TextField()   # fecha del libro diario (ISO YYYY-MM-DD)
    pdf_filename = models.TextField()  # nombre del PDF en el almacenamiento del servicio
    total_debit = models.IntegerField(default=0)   # total Debe (centavos)
    total_credit = models.IntegerField(default=0)  # total Haber (centavos)
    transactions_count = models.IntegerField(default=0)
    created_at = models.TextField()

    class Meta:
        db_table = 'daily_ledgers'
        ordering = ['-date', '-created_at']
        unique_together = ('group', 'date')

    def __str__(self):
        return f"Libro Diario {self.date} ({self.group})"
