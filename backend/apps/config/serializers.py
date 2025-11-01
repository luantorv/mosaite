from rest_framework import serializers
from .models import Config


class ConfigSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Config.
    """
    class Meta:
        model = Config
        fields = ['config_id', 'company_name', 'system_mode', 'date_format', 'currency']
        read_only_fields = ['config_id']

    def validate(self, data):
        """
        Validación adicional para asegurar que solo exista un registro.
        """
        instance = self.instance
        
        # Si estamos creando y ya existe un registro, error
        if not instance and Config.objects.exists():
            raise serializers.ValidationError(
                "Ya existe una configuración en el sistema. Use PUT para actualizar."
            )
        
        return data

    def validate_company_name(self, value):
        """Valida que el nombre de la compañía no esté vacío"""
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre de la compañía no puede estar vacío.")
        return value.strip()

    def validate_date_format(self, value):
        """Valida que el formato de fecha no esté vacío"""
        if not value or not value.strip():
            raise serializers.ValidationError("El formato de fecha no puede estar vacío.")
        return value.strip()