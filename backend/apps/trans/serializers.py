from rest_framework import serializers
from datetime import datetime
from .models import Transaction, TransactionEntry
from apps.accounts.serializers import AccountListSerializer


class TransactionEntrySerializer(serializers.ModelSerializer):
    account = AccountListSerializer(source='acc', read_only=True)
    acc_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = TransactionEntry
        fields = ['entr_id', 'acc_id', 'account', 'debit', 'credit']
        read_only_fields = ['entr_id']
    
    def validate(self, data):
        """Validar que no tenga débito y crédito al mismo tiempo"""
        debit = data.get('debit', 0)
        credit = data.get('credit', 0)
        
        if debit > 0 and credit > 0:
            raise serializers.ValidationError(
                'Una entrada no puede tener débito y crédito al mismo tiempo'
            )
        
        if debit == 0 and credit == 0:
            raise serializers.ValidationError(
                'Una entrada debe tener débito o crédito'
            )
        
        if debit < 0 or credit < 0:
            raise serializers.ValidationError(
                'Los montos no pueden ser negativos'
            )
        
        return data


class TransactionSerializer(serializers.ModelSerializer):
    entries = TransactionEntrySerializer(many=True, required=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    total_debit = serializers.SerializerMethodField()
    total_credit = serializers.SerializerMethodField()
    is_balanced = serializers.SerializerMethodField()
    
    class Meta:
        model = Transaction
        fields = [
            'trans_id', 'user', 'user_name', 'status', 'date', 
            'legend', 'created_at', 'updated_at', 'entries',
            'total_debit', 'total_credit', 'is_balanced'
        ]
        read_only_fields = ['trans_id', 'user', 'created_at', 'updated_at']
    
    def get_total_debit(self, obj):
        return sum(entry.debit for entry in obj.entries.all())
    
    def get_total_credit(self, obj):
        return sum(entry.credit for entry in obj.entries.all())
    
    def get_is_balanced(self, obj):
        total_debit = self.get_total_debit(obj)
        total_credit = self.get_total_credit(obj)
        return total_debit == total_credit
    
    def validate_entries(self, entries):
        """Validar que haya al menos 2 entradas"""
        if len(entries) < 2:
            raise serializers.ValidationError(
                'Una transacción debe tener al menos 2 entradas'
            )
        return entries
    
    def validate(self, data):
        """Validar que la transacción esté balanceada"""
        entries = data.get('entries', [])
        
        total_debit = sum(entry.get('debit', 0) for entry in entries)
        total_credit = sum(entry.get('credit', 0) for entry in entries)
        
        if total_debit != total_credit:
            raise serializers.ValidationError(
                f'La transacción no está balanceada. Débito: {total_debit}, Crédito: {total_credit}'
            )
        
        return data
    
    def create(self, validated_data):
        """Crear transacción con sus entradas"""
        entries_data = validated_data.pop('entries')
        
        # Agregar timestamps
        now = datetime.now().isoformat()
        validated_data['created_at'] = now
        validated_data['updated_at'] = now
        
        # Crear transacción
        transaction = Transaction.objects.create(**validated_data)
        
        # Crear entradas
        for entry_data in entries_data:
            TransactionEntry.objects.create(trans=transaction, **entry_data)
        
        return transaction
    
    def update(self, instance, validated_data):
        """Actualizar transacción y sus entradas"""
        entries_data = validated_data.pop('entries', None)
        
        # Actualizar timestamp
        validated_data['updated_at'] = datetime.now().isoformat()
        
        # Actualizar campos de la transacción
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Si hay entradas, eliminar las antiguas y crear las nuevas
        if entries_data is not None:
            instance.entries.all().delete()
            for entry_data in entries_data:
                TransactionEntry.objects.create(trans=instance, **entry_data)
        
        return instance


class TransactionListSerializer(serializers.ModelSerializer):
    """Serializer ligero para listados"""
    user_name = serializers.CharField(source='user.name', read_only=True)
    entries_count = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()
    
    class Meta:
        model = Transaction
        fields = [
            'trans_id', 'user_name', 'status', 'date', 
            'legend', 'created_at', 'entries_count', 'total_amount'
        ]
    
    def get_entries_count(self, obj):
        return obj.entries.count()
    
    def get_total_amount(self, obj):
        return sum(entry.debit for entry in obj.entries.all())