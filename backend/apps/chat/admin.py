from django.contrib import admin
from .models import ChatQuery, IndexStatus


@admin.register(ChatQuery)
class ChatQueryAdmin(admin.ModelAdmin):
    list_display = ['query_id', 'user', 'question_preview', 'context_used', 'created_at', 'response_time']
    list_filter = ['context_used', 'created_at', 'user']
    search_fields = ['question', 'answer', 'user__email']
    readonly_fields = ['query_id', 'created_at', 'response_time']
    
    def question_preview(self, obj):
        return obj.question[:50] + '...' if len(obj.question) > 50 else obj.question
    question_preview.short_description = 'Pregunta'


@admin.register(IndexStatus)
class IndexStatusAdmin(admin.ModelAdmin):
    list_display = ['status_id', 'is_available', 'is_rebuilding', 'total_vectors', 'total_documents', 'last_rebuild']
    readonly_fields = ['total_vectors', 'total_documents', 'last_rebuild', 'rebuild_by']