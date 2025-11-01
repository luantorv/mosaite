from django.contrib import admin
from .models import Config


@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    """
    Administrador para el modelo Config.
    """
    list_display = ['config_id', 'company_name', 'system_mode', 'date_format', 'currency']
    search_fields = ['company_name']
    
    def has_add_permission(self, request):
        """
        Deshabilita la opción de agregar si ya existe un registro.
        """
        return not Config.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        """
        Deshabilita la eliminación para evitar borrar la configuración.
        """
        return False