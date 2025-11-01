from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, UserRole


class UserRoleInline(admin.TabularInline):
    """Inline para mostrar roles del usuario"""
    model = UserRole
    extra = 1
    raw_id_fields = ['role']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Administrador personalizado para el modelo User"""
    
    list_display = ['user_id', 'email', 'name', 'status', 'group', 'created_at']
    list_filter = ['status', 'group', 'is_staff', 'is_superuser']
    search_fields = ['email', 'name']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Información Personal', {
            'fields': ('email', 'name', 'password')
        }),
        ('Información del Sistema', {
            'fields': ('status', 'group', 'created_at', 'updated_at')
        }),
        ('Permisos de Django', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        ('Crear Usuario', {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'status', 'group'),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    inlines = [UserRoleInline]
    
    def get_inline_instances(self, request, obj=None):
        """Muestra inlines solo al editar, no al crear"""
        if not obj:
            return []
        return super().get_inline_instances(request, obj)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    """Administrador para el modelo Role"""
    
    list_display = ['role_id', 'name', 'user_count']
    search_fields = ['name']
    
    def user_count(self, obj):
        """Cuenta cuántos usuarios tienen este rol"""
        return obj.role_users.count()
    user_count.short_description = 'Usuarios'
    
    def has_delete_permission(self, request, obj=None):
        """Previene eliminar roles que están en uso"""
        if obj and obj.role_users.exists():
            return False
        return super().has_delete_permission(request, obj)


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    """Administrador para la tabla intermedia UserRole"""
    
    list_display = ['user', 'role']
    list_filter = ['role']
    search_fields = ['user__email', 'user__name', 'role__name']
    raw_id_fields = ['user', 'role']