# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from .serializers import LoginSerializer, UserSerializer

class HealthCheckView(APIView):
    """
    Vista para verificar que la API está funcionando
    """
    def get(self, request):
        return Response({
            'status': 'OK',
            'message': 'API de autenticación funcionando correctamente'
        }, status=status.HTTP_200_OK)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenView(APIView):
    """
    Vista para obtener el token CSRF
    """
    permission_classes = []  # Permitir acceso sin autenticación
    
    def get(self, request):
        return Response({'csrfToken': get_token(request)})

class LoginView(APIView):
    """
    Vista para iniciar sesión
    """
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            
            user_data = UserSerializer(user).data
            
            return Response({
                'message': 'Inicio de sesión exitoso',
                'user': user_data
            }, status=status.HTTP_200_OK)
        
        return Response({
            'error': 'Credenciales inválidas',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """
    Vista para cerrar sesión
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({
            'message': 'Sesión cerrada exitosamente'
        }, status=status.HTTP_200_OK)

class CurrentUserView(APIView):
    """
    Vista para obtener los datos del usuario actual
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            'user': serializer.data
        }, status=status.HTTP_200_OK)