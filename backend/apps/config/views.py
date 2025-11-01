from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Config
from .serializers import ConfigSerializer


class ConfigView(APIView):
    """
    Vista para obtener y actualizar la configuración del sistema.
    
    GET: Obtiene la configuración actual (los 4 campos)
    PUT: Actualiza la configuración
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Obtiene la configuración del sistema.
        Retorna un JSON con los 4 campos de configuración.
        """
        config = Config.get_config()
        
        if not config:
            return Response(
                {"detail": "No existe configuración en el sistema."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ConfigSerializer(config)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """
        Actualiza la configuración del sistema.
        """
        config = Config.get_config()
        
        if not config:
            return Response(
                {"detail": "No existe configuración en el sistema. Debe crear una primero."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ConfigSerializer(config, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)