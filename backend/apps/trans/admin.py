# apps/transactions/admin.py
from django.contrib import admin
from .models import Transaction, TransactionEntry


class TransactionEntryInline(admin.TabularInline):
    model = TransactionEntry
    extra = 2


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['trans_id', 'user', 'date', 'status', 'legend', 'created_at']
    list_filter = ['status', 'date', 'user']
    search_fields = ['legend', 'trans_id']
    inlines = [TransactionEntryInline]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(TransactionEntry)
class TransactionEntryAdmin(admin.ModelAdmin):
    list_display = ['entr_id', 'trans', 'acc', 'debit', 'credit']
    list_filter = ['trans']