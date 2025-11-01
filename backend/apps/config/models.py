from django.db import models


class Config(models.Model):
    """
    Modelo de configuración del sistema.
    Solo debe existir un único registro.
    """
    config_id = models.AutoField(primary_key=True)
    company_name = models.TextField(unique=True)
    system_mode = models.BooleanField(unique=True)
    date_format = models.TextField(unique=True)
    currency = models.TextField(unique=True, null=True, blank=True)

    class Meta:
        db_table = 'config'
        verbose_name = 'Configuración'
        verbose_name_plural = 'Configuraciones'

    def __str__(self):
        return f"Config {self.config_id} - {self.company_name}"

    @classmethod
    def get_config(cls):
        """
        Obtiene la configuración del sistema.
        Si no existe, retorna None.
        """
        return cls.objects.first()

    @classmethod
    def get_company_name(cls):
        """Obtiene el nombre de la compañía"""
        config = cls.get_config()
        return config.company_name if config else None

    @classmethod
    def get_system_mode(cls):
        """Obtiene el modo del sistema"""
        config = cls.get_config()
        return config.system_mode if config else None

    @classmethod
    def get_date_format(cls):
        """Obtiene el formato de fecha"""
        config = cls.get_config()
        return config.date_format if config else None

    @classmethod
    def get_currency(cls):
        """Obtiene la moneda"""
        config = cls.get_config()
        return config.currency if config else None