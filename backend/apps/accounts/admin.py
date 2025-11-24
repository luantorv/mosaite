# apps/accounts/admin.py
from django.contrib import admin
from .models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['acc_id', 'code', 'name', 'saldo', 'nature', 'status']
    list_filter = ['nature', 'status']
    search_fields = ['code', 'name']