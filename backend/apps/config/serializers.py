from rest_framework import serializers
from .models import Config


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ['config_id', 'system_mode', 'date_format', 'currency']