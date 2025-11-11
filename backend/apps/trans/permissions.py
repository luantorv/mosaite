from rest_framework import permissions


class CanManageTransactions(permissions.BasePermission):
    """
    Permisos para transacciones:
    - Crear: Todos excepto rol 4 (Viewer)
    - Ver: Todos
    - Editar: Solo Admin (0) y Accountant (2)
    - Eliminar: Solo Admin (0)
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # GET permitido para todos
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # POST (crear) permitido para todos menos rol 4
        if request.method == 'POST':
            return request.user.rol != 4
        
        # PUT/PATCH permitido para Admin y Accountant
        if request.method in ['PUT', 'PATCH']:
            return request.user.rol in [0, 2]
        
        # DELETE solo para Admin
        if request.method == 'DELETE':
            return request.user.rol == 0
        
        return False
    
    def has_object_permission(self, request, view, obj):
        # Los mismos permisos se aplican a nivel de objeto
        return self.has_permission(request, view)