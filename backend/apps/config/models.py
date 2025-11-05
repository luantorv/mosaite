from django.db import models


class Config(models.Model):
    config_id = models.AutoField(primary_key=True)
    system_mode = models.BooleanField(default=False)  # False: educativo, True: empresarial
    date_format = models.TextField(default='DD/MM/YYYY')
    currency = models.TextField(null=True, blank=True, default='ARS')
    
    class Meta:
        db_table = 'config'
    
    def __str__(self):
        mode = 'Empresarial' if self.system_mode else 'Educativo'
        return f'Config - Modo: {mode}'
    
    def save(self, *args, **kwargs):
        # Asegurar que solo haya un registro de configuración
        if not self.pk and Config.objects.exists():
            raise ValueError('Ya existe una configuración. Solo puede haber una.')
        return super().save(*args, **kwargs)