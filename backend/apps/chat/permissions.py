from rest_framework import permissions


class CanUseChat(permissions.BasePermission):
    """
    Todos los usuarios autenticados pueden usar el chat
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated


class CanRebuildIndex(permissions.BasePermission):
    """
    Solo Admin (0) y Profesor (0 en modo educativo) pueden reconstruir el índice
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # Solo rol 0 (Admin/Profesor) puede reconstruir
        return request.user.rol == 0


class CanViewHistory(permissions.BasePermission):
    """
    Admin/Profesor pueden ver todo el historial
    Otros usuarios solo pueden ver su propio historial
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Admin/Profesor pueden ver todo
        if request.user.rol == 0:
            return True
        
        # Usuarios solo pueden ver sus propias consultas
        return obj.user == request.user