from django.db import models
from apps.users.models import User


class ChatQuery(models.Model):
    """Modelo para registrar las consultas al chat"""
    query_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_queries')
    question = models.TextField()
    answer = models.TextField()
    sources = models.JSONField(default=list)
    context_used = models.BooleanField(default=False)
    created_at = models.TextField()
    response_time = models.FloatField(null=True, blank=True)  # Tiempo en segundos
    
    class Meta:
        db_table = 'chat_queries'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Query {self.query_id} - {self.user.email}"


class IndexStatus(models.Model):
    """Estado del índice de embeddings"""
    status_id = models.AutoField(primary_key=True)
    is_available = models.BooleanField(default=True)
    is_rebuilding = models.BooleanField(default=False)
    last_rebuild = models.TextField(null=True, blank=True)
    total_vectors = models.IntegerField(default=0)
    total_documents = models.IntegerField(default=0)
    rebuild_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='index_rebuilds'
    )
    
    class Meta:
        db_table = 'index_status'
    
    def __str__(self):
        return f"Index Status - Available: {self.is_available}"
    
    @classmethod
    def get_current_status(cls):
        """Obtiene o crea el estado actual"""
        status, created = cls.objects.get_or_create(
            pk=1,
            defaults={
                'is_available': True,
                'is_rebuilding': False
            }
        )
        return status