from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Config
from .serializers import ConfigSerializer


class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Retorna la configuración actual del sistema"""
        config = Config.objects.first()
        if not config:
            # Crear config por defecto si no existe
            config = Config.objects.create(
                system_mode=False,  # Modo educativo por defecto
                date_format='DD/MM/YYYY',
                currency='ARS'
            )
        serializer = self.get_serializer(config)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def role_names(self, request):
        """Retorna los nombres de roles según el modo del sistema"""
        config = Config.objects.first()
        
        if not config or not config.system_mode:  # Modo educativo
            roles = {
                0: 'Profesor',
                2: 'Alumno'
            }
        else:  # Modo empresarial
            roles = {
                0: 'Admin',
                1: 'Manager',
                2: 'Accountant',
                3: 'Operator',
                4: 'Viewer'
            }
        
        return Response(roles)