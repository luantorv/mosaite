from django.db import models
from apps.users.models import User


class Transaction(models.Model):
    """Modelo para transacciones contables"""
    trans_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    status = models.BooleanField(default=True)  # True: completada, False: borrador
    date = models.TextField()  # Fecha de la transacción (ISO)
    legend = models.TextField(null=True, blank=True)  # Descripción/leyenda
    created_at = models.TextField()
    updated_at = models.TextField()
    
    class Meta:
        db_table = 'transactions'
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"Transaction {self.trans_id} - {self.date}"


class TransactionEntry(models.Model):
    """Modelo para entradas de transacciones (asientos)"""
    entr_id = models.AutoField(primary_key=True)
    trans = models.ForeignKey(
        Transaction, 
        on_delete=models.CASCADE, 
        related_name='entries'
    )
    acc = models.ForeignKey(
        'accounts.Account',
        on_delete=models.PROTECT,
        related_name='transaction_entries'
    )
    debit = models.IntegerField(default=0)  # Debe
    credit = models.IntegerField(default=0)  # Haber
    
    class Meta:
        db_table = 'transaction_entries'
    
    def __str__(self):
        return f"Entry {self.entr_id} - Trans {self.trans_id}"
    
    def clean(self):
        """Validar que no tenga tanto débito como crédito"""
        from django.core.exceptions import ValidationError
        if self.debit > 0 and self.credit > 0:
            raise ValidationError('Una entrada no puede tener débito y crédito al mismo tiempo')
        if self.debit == 0 and self.credit == 0:
            raise ValidationError('Una entrada debe tener débito o crédito')