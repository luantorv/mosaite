from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError
from .models import User
from .serializers import UserSerializer, UserListSerializer, CustomTokenObtainPairSerializer
from .permissions import HasRoleForAction
from .utils import validate_role_for_system
from apps.config.models import Config


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Vista personalizada de login que usa nuestro serializer personalizado
    """
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, HasRoleForAction]
    
    # Definir roles por acción
    action_roles = {
        'list': 'Z',        # Admin y Manager pueden listar (0, 1)
        'retrieve': 'X',    # Admin, Manager y Accountant pueden ver detalle
        'create': 'Z',      # Admin y Manager pueden crear
        'update': 'S',      # Solo Admin puede actualizar
        'partial_update': 'Z', # Admin y Manager pueden actualizar parcialmente
        'destroy': 'S',     # Solo Admin puede eliminar
        'me': 'A',          # Todos pueden ver su propio perfil
    }
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        return UserSerializer
    
    def get_queryset(self):
        queryset = User.objects.all().order_by('-created_at')
        
        # Filtros opcionales
        status_filter = self.request.query_params.get('status', None)
        rol_filter = self.request.query_params.get('rol', None)
        group_filter = self.request.query_params.get('group', None)
        
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter)
        if rol_filter is not None:
            queryset = queryset.filter(rol=rol_filter)
        if group_filter:
            queryset = queryset.filter(group__icontains=group_filter)
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        # Validar rol según modo del sistema
        rol = request.data.get('rol')
        if rol is not None and not validate_role_for_system(rol):
            try:
                config = Config.objects.first()
                mode = 'educativo' if (config and not config.system_mode) else 'empresarial'
                if mode == 'educativo':
                    return Response(
                        {'error': 'En modo educativo solo se pueden crear usuarios con rol 0 (Profesor) o 2 (Alumno)'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except:
                pass
            
            return Response(
                {'error': 'Rol inválido para el modo actual del sistema'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Retorna información del usuario autenticado"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Invalida el refresh token para hacer logout
        """
        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response(
                    {'error': 'Se requiere el refresh_token'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {'message': 'Logout exitoso'},
                status=status.HTTP_200_OK
            )
        except TokenError:
            return Response(
                {'error': 'Token inválido o expirado'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )