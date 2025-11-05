from apps.config.models import Config


def get_available_roles_for_creation():
    """
    Retorna los roles disponibles según el modo del sistema.
    Útil para validaciones en serializers.
    """
    try:
        config = Config.objects.first()
        if config and not config.system_mode:  # Modo educativo
            return [0, 2]  # Profesor, Alumno
        else:  # Modo empresarial
            return [0, 1, 2, 3, 4]  # Todos
    except:
        return [0, 2]  # Por defecto modo educativo


def validate_role_for_system(rol):
    """
    Valida si un rol es válido para el modo actual del sistema.
    """
    available_roles = get_available_roles_for_creation()
    return rol in available_roles


def get_role_display_name(rol, system_mode=None):
    """
    Retorna el nombre del rol según el modo del sistema.
    """
    if system_mode is None:
        try:
            config = Config.objects.first()
            system_mode = config.system_mode if config else False
        except:
            system_mode = False
    
    if not system_mode:  # Modo educativo
        role_names = {
            0: 'Profesor',
            2: 'Alumno'
        }
    else:  # Modo empresarial
        role_names = {
            0: 'Admin',
            1: 'Manager',
            2: 'Accountant',
            3: 'Operator',
            4: 'Viewer'
        }
    
    return role_names.get(rol, f'Rol {rol}')