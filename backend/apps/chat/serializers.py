from rest_framework import serializers
from .models import ChatQuery, IndexStatus


class ChatQuerySerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = ChatQuery
        fields = [
            'query_id', 'user', 'user_name', 'user_email',
            'question', 'answer', 'sources', 'context_used',
            'created_at', 'response_time'
        ]
        read_only_fields = ['query_id', 'created_at', 'user_name', 'user_email']


class ChatRequestSerializer(serializers.Serializer):
    """Serializer para las peticiones de chat"""
    question = serializers.CharField(max_length=2000, required=True)
    
    def validate_question(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "La pregunta debe tener al menos 3 caracteres"
            )
        return value.strip()


class ChatResponseSerializer(serializers.Serializer):
    """Serializer para las respuestas de chat"""
    answer = serializers.CharField()
    sources = serializers.ListField(child=serializers.DictField())
    context_used = serializers.BooleanField()
    response_time = serializers.FloatField(required=False)
    query_id = serializers.IntegerField(required=False)


class IndexStatusSerializer(serializers.ModelSerializer):
    rebuild_by_name = serializers.CharField(source='rebuild_by.name', read_only=True)
    
    class Meta:
        model = IndexStatus
        fields = [
            'status_id', 'is_available', 'is_rebuilding',
            'last_rebuild', 'total_vectors', 'total_documents',
            'rebuild_by', 'rebuild_by_name'
        ]
        read_only_fields = [
            'status_id', 'total_vectors', 'total_documents'
        ]


class RebuildIndexSerializer(serializers.Serializer):
    """Serializer para solicitudes de reconstrucción"""
    confirm = serializers.BooleanField(required=True)
    
    def validate_confirm(self, value):
        if not value:
            raise serializers.ValidationError(
                "Debes confirmar la reconstrucción del índice"
            )
        return value