from rest_framework.permissions import BasePermission
from backend.apps.config.models import Config
from .models import Role


class RoleBasedPermission(BasePermission):
    """
    Clase base para permisos basados en roles.
    
    Niveles de permisos según system_mode:
    
    Business Mode (system_mode = True):
    - "A": Todos los usuarios registrados
    - "S": Solo Admin
    - "N": Todos excepto Viewer (Admin, Manager, Accountant, Operator)
    - "X": Accountant, Manager y Admin
    - "Y": Accountant y Admin
    - "Z": Manager y Admin
    
    Education Mode (system_mode = False):
    - "A": Todos los usuarios registrados
    - "S": Solo Professor (equivalente a Admin)
    - "N": Solo Professor (equivalente a no-Viewer)
    - "X": Professor (equivalente a Accountant+)
    - "Y": Professor (equivalente a Accountant+Admin)
    - "Z": Professor (equivalente a Manager+Admin)
    """
    
    # Define el nivel de permiso requerido
    required_permission_level = None
    
    def has_permission(self, request, view):
        """Verifica si el usuario tiene el nivel de permiso requerido"""
        if not request.user or not request.user.is_authenticated:
            return False
        
        if not self.required_permission_level:
            return True
        
        return self.check_permission_level(
            request.user,
            self.required_permission_level
        )
    
    @staticmethod
    def check_permission_level(user, level):
        """
        Verifica si un usuario tiene el nivel de permiso especificado.
        
        Args:
            user: Usuario a verificar
            level: Nivel de permiso ("A", "S", "N", "X", "Y", "Z")
        
        Returns:
            bool: True si tiene permiso, False en caso contrario
        """
        # Obtener configuración del sistema
        config = Config.get_config()
        if not config:
            return False
        
        system_mode = config.system_mode
        user_role_names = user.get_role_names()
        
        if not user_role_names:
            return False
        
        # Nivel A: Todos los usuarios autenticados
        if level == "A":
            return True
        
        # Business Mode
        if system_mode:
            if level == "S":
                # Solo Admin
                return Role.ROLE_ADMIN in user_role_names
            
            elif level == "N":
                # Todos excepto Viewer
                allowed_roles = [
                    Role.ROLE_ADMIN,
                    Role.ROLE_MANAGER,
                    Role.ROLE_ACCOUNTANT,
                    Role.ROLE_OPERATOR
                ]
                return any(role in user_role_names for role in allowed_roles)
            
            elif level == "X":
                # Accountant, Manager y Admin
                allowed_roles = [
                    Role.ROLE_ADMIN,
                    Role.ROLE_MANAGER,
                    Role.ROLE_ACCOUNTANT
                ]
                return any(role in user_role_names for role in allowed_roles)
            
            elif level == "Y":
                # Accountant y Admin
                allowed_roles = [
                    Role.ROLE_ADMIN,
                    Role.ROLE_ACCOUNTANT
                ]
                return any(role in user_role_names for role in allowed_roles)
            
            elif level == "Z":
                # Manager y Admin
                allowed_roles = [
                    Role.ROLE_ADMIN,
                    Role.ROLE_MANAGER
                ]
                return any(role in user_role_names for role in allowed_roles)
        
        # Education Mode
        else:
            if level == "S":
                # Solo Professor (equivalente a Admin)
                return Role.ROLE_PROFESSOR in user_role_names
            
            elif level in ["N", "X", "Y", "Z"]:
                # En modo educativo, todos estos niveles requieren Professor
                return Role.ROLE_PROFESSOR in user_role_names
        
        return False


# Clases de permiso predefinidas para cada nivel
class PermissionA(RoleBasedPermission):
    """Todos los usuarios autenticados"""
    required_permission_level = "A"


class PermissionS(RoleBasedPermission):
    """Solo Admin (o Professor en modo educativo)"""
    required_permission_level = "S"


class PermissionN(RoleBasedPermission):
    """Todos excepto Viewer (o solo Professor en modo educativo)"""
    required_permission_level = "N"


class PermissionX(RoleBasedPermission):
    """Accountant, Manager y Admin (o Professor en modo educativo)"""
    required_permission_level = "X"


class PermissionY(RoleBasedPermission):
    """Accountant y Admin (o Professor en modo educativo)"""
    required_permission_level = "Y"


class PermissionZ(RoleBasedPermission):
    """Manager y Admin (o Professor en modo educativo)"""
    required_permission_level = "Z"


def has_permission(user, level):
    """
    Función helper para verificar permisos en vistas o lógica de negocio.
    
    Uso:
        from backend.apps.users.permissions import has_permission
        
        if has_permission(request.user, "S"):
            # Usuario es Admin
            ...
    
    Args:
        user: Usuario a verificar
        level: Nivel de permiso ("A", "S", "N", "X", "Y", "Z")
    
    Returns:
        bool: True si tiene permiso, False en caso contrario
    """
    return RoleBasedPermission.check_permission_level(user, level)