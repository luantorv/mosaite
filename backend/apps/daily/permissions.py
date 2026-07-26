from rest_framework import permissions


class CanManageDailyLedgers(permissions.BasePermission):
    """
    Permisos para libros diarios:
    - Ver / descargar (métodos seguros): cualquier usuario autenticado.
    - Crear / eliminar: solo Admin (rol 0) y Contador (rol 2).

    El aislamiento por grupo (tenant) se aplica además en el queryset de la vista.
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        if request.user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return True

        # Crear (POST) y eliminar (DELETE): Admin y Contador
        return request.user.rol in [0, 2]
