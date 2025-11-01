from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Role, UserRole
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    RoleSerializer,
    LoginSerializer,
    ChangePasswordSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD de usuarios.
    
    list: GET /users/ - Lista todos los usuarios
    retrieve: GET /users/{id}/ - Obtiene un usuario específico
    create: POST /users/ - Crea un nuevo usuario
    update: PUT /users/{id}/ - Actualiza completamente un usuario
    partial_update: PATCH /users/{id}/ - Actualiza parcialmente un usuario
    destroy: DELETE /users/{id}/ - Elimina un usuario (soft delete)
    """
    
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'user_id'
    
    def get_serializer_class(self):
        """Retorna el serializer apropiado según la acción"""
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer
    
    def get_queryset(self):
        """Filtra usuarios activos por defecto"""
        queryset = User.objects.prefetch_related('user_roles__role').all()
        
        # Filtro por status
        status_param = self.request.query_params.get('status', None)
        if status_param is not None:
            queryset = queryset.filter(status=int(status_param))
        
        # Filtro por grupo
        group = self.request.query_params.get('group', None)
        if group:
            queryset = queryset.filter(group__icontains=group)
        
        # Filtro por rol
        role_id = self.request.query_params.get('role_id', None)
        if role_id:
            queryset = queryset.filter(user_roles__role_id=role_id).distinct()
        
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        """Soft delete: marca el usuario como inactivo en lugar de eliminarlo"""
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response(
            {"detail": "Usuario desactivado exitosamente."},
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'])
    def activate(self, request, user_id=None):
        """Activa un usuario desactivado"""
        user = self.get_object()
        user.status = 1
        user.save()
        return Response(
            {"detail": "Usuario activado exitosamente."},
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'])
    def assign_roles(self, request, user_id=None):
        """Asigna roles a un usuario"""
        user = self.get_object()
        role_ids = request.data.get('role_ids', [])
        
        if not role_ids:
            return Response(
                {"detail": "Debe proporcionar al menos un rol."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validar roles
        serializer = UserSerializer()
        try:
            validated_role_ids = serializer.validate_role_ids(role_ids)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Eliminar roles actuales
        UserRole.objects.filter(user=user).delete()
        
        # Asignar nuevos roles
        for role_id in validated_role_ids:
            UserRole.objects.create(user=user, role_id=role_id)
        
        return Response(
            UserSerializer(user).data,
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['get'])
    def roles(self, request, user_id=None):
        """Obtiene los roles de un usuario"""
        user = self.get_object()
        roles = user.get_roles()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Obtiene la información del usuario autenticado"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para roles.
    
    list: GET /users/roles/ - Lista todos los roles
    retrieve: GET /users/roles/{id}/ - Obtiene un rol específico
    """
    
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'role_id'
    
    def get_queryset(self):
        """Filtra roles según el modo del sistema"""
        # Importar Config aquí para evitar importación circular
        from backend.apps.config.models import Config
        
        config = Config.get_config()
        if not config:
            return Role.objects.none()
        
        return Role.get_roles_for_mode(config.system_mode)
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        """Lista los roles disponibles para el modo actual del sistema"""
        roles = self.get_queryset()
        serializer = self.get_serializer(roles, many=True)
        return Response(serializer.data)


class LoginView(APIView):
    """Vista para iniciar sesión y obtener tokens JWT"""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        """
        Autentica usuario y retorna tokens JWT
        
        Body:
        {
            "email": "user@example.com",
            "password": "password123"
        }
        """
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = authenticate(request, username=email, password=password)
        
        if user is None:
            return Response(
                {"detail": "Credenciales inválidas."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if user.status == 0:
            return Response(
                {"detail": "Usuario inactivo."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Generar tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """Vista para cerrar sesión (blacklist del refresh token)"""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Invalida el refresh token
        
        Body:
        {
            "refresh": "refresh_token_here"
        }
        """
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"detail": "Refresh token requerido."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"detail": "Sesión cerrada exitosamente."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"detail": "Token inválido o expirado."},
                status=status.HTTP_400_BAD_REQUEST
            )


class RefreshTokenView(APIView):
    """Vista para refrescar el access token"""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        """
        Genera un nuevo access token usando el refresh token
        
        Body:
        {
            "refresh": "refresh_token_here"
        }
        """
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"detail": "Refresh token requerido."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            refresh = RefreshToken(refresh_token)
            
            return Response({
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": "Token inválido o expirado."},
                status=status.HTTP_401_UNAUTHORIZED
            )


class ChangePasswordView(APIView):
    """Vista para cambiar la contraseña del usuario autenticado"""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Cambia la contraseña del usuario
        
        Body:
        {
            "old_password": "current_password",
            "new_password": "new_password",
            "new_password_confirm": "new_password"
        }
        """
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        # Verificar contraseña actual
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {"detail": "Contraseña actual incorrecta."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Establecer nueva contraseña
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response(
            {"detail": "Contraseña actualizada exitosamente."},
            status=status.HTTP_200_OK
        )


class VerifyTokenView(APIView):
    """Vista para verificar si un token es válido"""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Verifica que el token sea válido"""
        return Response(
            {
                "detail": "Token válido.",
                "user": UserSerializer(request.user).data
            },
            status=status.HTTP_200_OK
        )