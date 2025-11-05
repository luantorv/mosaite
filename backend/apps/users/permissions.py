from rest_framework import permissions
from apps.config.models import Config


# Definición de grupos de roles predefinidos
ROLE_GROUPS = {
    'A': [0, 1, 2, 3, 4],   # All - Todos los roles
    'N': [0, 1, 2, 3],      # Not Viewer - Todos menos Viewer
    'X': [0, 1, 2],         # eXecutive - Admin, Manager, Accountant
    'Y': [0, 2],            # Year-end - Admin, Accountant
    'Z': [0, 1],            # Zone managers - Admin, Manager
    'S': [0],               # Super - Solo Admin
}


def get_allowed_roles(role_spec):
    """
    Convierte una especificación de roles en una lista de números.
    
    Args:
        role_spec: Puede ser:
            - Una letra (A, N, X, Y, Z, S) para grupos predefinidos
            - Una lista de números [0, 1, 2, ...]
            - Un número individual 0
    
    Returns:
        Lista de roles permitidos
    """
    if isinstance(role_spec, str) and len(role_spec) == 1:
        # Si es una letra, buscar en ROLE_GROUPS
        return ROLE_GROUPS.get(role_spec.upper(), [])
    elif isinstance(role_spec, list):
        # Si es una lista, devolverla tal cual
        return role_spec
    elif isinstance(role_spec, int):
        # Si es un número, devolverlo en una lista
        return [role_spec]
    return []


class HasRolePermission(permissions.BasePermission):
    """
    Permiso que verifica si el usuario tiene uno de los roles permitidos.
    
    Uso en ViewSets:
        permission_classes = [IsAuthenticated, HasRolePermission]
        required_roles = 'S'  # o [0, 1, 2] o 0
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # Obtener los roles requeridos de la vista
        required_roles = getattr(view, 'required_roles', None)
        
        if required_roles is None:
            # Si no se especifican roles, permitir acceso
            return True
        
        # Convertir la especificación a lista de roles
        allowed_roles = get_allowed_roles(required_roles)
        
        # Verificar si el rol del usuario está en la lista
        return request.user.rol in allowed_roles


class HasRoleForAction(permissions.BasePermission):
    """
    Permiso que permite definir roles diferentes según la acción HTTP.
    
    Uso en ViewSets:
        permission_classes = [IsAuthenticated, HasRoleForAction]
        action_roles = {
            'list': 'A',      # Todos pueden listar
            'retrieve': 'A',  # Todos pueden ver detalle
            'create': 'X',    # Solo Admin, Manager, Accountant pueden crear
            'update': 'Y',    # Solo Admin y Accountant pueden actualizar
            'partial_update': 'Y',
            'destroy': 'S',   # Solo Admin puede eliminar
        }
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # Obtener el mapeo de acciones a roles
        action_roles = getattr(view, 'action_roles', None)
        
        if action_roles is None:
            # Si no se especifica, permitir acceso
            return True
        
        # Obtener la acción actual
        action = view.action
        
        # Si la acción no está en el mapeo, denegar por defecto
        if action not in action_roles:
            return False
        
        # Obtener los roles permitidos para esta acción
        role_spec = action_roles[action]
        allowed_roles = get_allowed_roles(role_spec)
        
        # Verificar si el rol del usuario está en la lista
        return request.user.rol in allowed_roles


class CanManageUsers(permissions.BasePermission):
    """
    Permiso específico para gestión de usuarios.
    Verifica restricciones del modo educativo.
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # Solo Admin y Accountant pueden gestionar usuarios
        if request.user.rol not in [0, 2]:
            return False
        
        # Verificar restricciones del modo educativo en creación
        if request.method == 'POST':
            try:
                config = Config.objects.first()
                if config and not config.system_mode:  # Modo educativo
                    rol = request.data.get('rol')
                    if rol not in [0, 2]:  # Solo Profesor y Alumno
                        return False
            except:
                pass
        
        return True


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permiso que permite acceso al owner del objeto o a admins.
    """
    
    def has_object_permission(self, request, view, obj):
        # Superusers siempre tienen permiso
        if request.user.is_superuser:
            return True
        
        # Admin siempre tiene permiso
        if request.user.rol == 0:
            return True
        
        # Verificar si el usuario es el dueño
        # Asumiendo que el objeto tiene un campo 'user' o 'user_id'
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'user_id'):
            return obj.user_id == request.user.user_id
        
        return False