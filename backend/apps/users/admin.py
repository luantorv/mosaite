from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'name', 'rol', 'status', 'group', 'created_at']
    list_filter = ['status', 'rol', 'group']
    search_fields = ['email', 'name']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('name', 'group')}),
        ('Permisos', {'fields': ('rol', 'status', 'is_staff', 'is_superuser')}),
        ('Fechas', {'fields': ('created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'rol', 'group', 'status'),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']