from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['acc_id', 'code', 'name', 'saldo', 'nature', 'status']
        read_only_fields = ['acc_id', 'saldo']


class AccountListSerializer(serializers.ModelSerializer):
    """Serializer ligero para listados"""
    nature_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Account
        fields = ['acc_id', 'code', 'name', 'saldo', 'nature', 'nature_display', 'status']
    
    def get_nature_display(self, obj):
        return 'Deudora' if obj.nature else 'Acreedora'