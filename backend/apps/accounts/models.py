from django.db import models


class Account(models.Model):
    """Modelo para el plan de cuentas"""
    acc_id = models.AutoField(primary_key=True)
    code = models.TextField(unique=True)  # Código de cuenta
    name = models.TextField()  # Nombre de la cuenta
    saldo = models.IntegerField(default=0)  # Saldo actual
    nature = models.BooleanField()  # True: Deudora, False: Acreedora
    status = models.BooleanField(default=True)  # True: Activa, False: Inactiva
    
    class Meta:
        db_table = 'accounts'
        ordering = ['code']
    
    def __str__(self):
        return f"{self.code} - {self.name}"