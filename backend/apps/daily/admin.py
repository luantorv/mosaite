from django.contrib import admin
from .models import DailyLedger


@admin.register(DailyLedger)
class DailyLedgerAdmin(admin.ModelAdmin):
    list_display = ('ledger_id', 'date', 'group', 'user', 'transactions_count', 'created_at')
    list_filter = ('group',)
    search_fields = ('date', 'group')
