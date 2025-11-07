from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
import time
import uuid

from .models import ChatQuery, IndexStatus
from .serializers import (
    ChatQuerySerializer,
    ChatRequestSerializer,
    ChatResponseSerializer,
    IndexStatusSerializer,
    RebuildIndexSerializer
)
from .permissions import CanUseChat, CanRebuildIndex, CanViewHistory
from .tasks import start_rebuild_index
from services.chat import rag_service


class ChatViewSet(viewsets.ViewSet):
    """ViewSet para el chat con RAG"""
    permission_classes = [IsAuthenticated, CanUseChat]
    
    # Diccionario para trackear peticiones activas
    active_requests = {}
    
    @action(detail=False, methods=['post'])
    def query(self, request):
        """
        Procesa una consulta al chat
        
        POST /api/chat/query/
        {
            "question": "¿Qué es el debe y el haber?"
        }
        """
        # Verificar estado del índice
        index_status = IndexStatus.get_current_status()
        
        if not index_status.is_available or index_status.is_rebuilding:
            return Response(
                {
                    'error': 'El servicio de chat no está disponible en este momento. '
                             'El índice se está reconstruyendo, por favor intenta más tarde.',
                    'is_rebuilding': index_status.is_rebuilding,
                    'is_available': index_status.is_available
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Validar request
        request_serializer = ChatRequestSerializer(data=request.data)
        if not request_serializer.is_valid():
            return Response(
                request_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        question = request_serializer.validated_data['question']
        
        # Generar ID único para la petición
        request_id = str(uuid.uuid4())
        self.active_requests[request_id] = True
        
        try:
            # Inicializar el servicio RAG si no está inicializado
            if not rag_service._generation_threads:
                rag_service.initialize()
            
            # Medir tiempo de respuesta
            start_time = time.time()
            
            # Procesar query
            result = rag_service.query(
                question=question,
                request_id=request_id,
                stream=False
            )
            
            response_time = time.time() - start_time
            
            # Guardar en historial
            chat_query = ChatQuery.objects.create(
                user=request.user,
                question=question,
                answer=result.get('answer', ''),
                sources=result.get('sources', []),
                context_used=result.get('context_used', False),
                created_at=datetime.now().isoformat(),
                response_time=response_time
            )
            
            # Limpiar petición activa
            self.active_requests.pop(request_id, None)
            
            # Preparar respuesta
            response_data = {
                'answer': result.get('answer', ''),
                'sources': result.get('sources', []),
                'context_used': result.get('context_used', False),
                'response_time': round(response_time, 2),
                'query_id': chat_query.query_id
            }
            
            response_serializer = ChatResponseSerializer(data=response_data)
            response_serializer.is_valid(raise_exception=True)
            
            return Response(
                response_serializer.data,
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            # Limpiar petición activa
            self.active_requests.pop(request_id, None)
            
            return Response(
                {
                    'error': f'Error procesando la consulta: {str(e)}',
                    'answer': 'Lo siento, ocurrió un error al procesar tu pregunta.',
                    'sources': [],
                    'context_used': False
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def cancel(self, request):
        """
        Cancela una petición en curso
        
        POST /api/chat/cancel/
        {
            "request_id": "uuid-here"
        }
        """
        request_id = request.data.get('request_id')
        
        if not request_id:
            return Response(
                {'error': 'Se requiere request_id'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request_id in self.active_requests:
            rag_service.cancel_request(request_id)
            self.active_requests.pop(request_id, None)
            
            return Response(
                {'message': 'Petición cancelada exitosamente'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Petición no encontrada o ya finalizada'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def status(self, request):
        """
        Obtiene el estado del servicio de chat
        
        GET /api/chat/status/
        """
        index_status = IndexStatus.get_current_status()
        
        # Obtener estadísticas actuales si está disponible
        if index_status.is_available and not index_status.is_rebuilding:
            try:
                stats = rag_service.get_stats()
                index_status.total_vectors = stats.get('total_vectors', 0)
                index_status.total_documents = stats.get('total_documents', 0)
                index_status.save()
            except:
                pass
        
        serializer = IndexStatusSerializer(index_status)
        return Response(serializer.data)
    
    @action(
        detail=False,
        methods=['post'],
        permission_classes=[IsAuthenticated, CanRebuildIndex]
    )
    def rebuild(self, request):
        """
        Reconstruye el índice de embeddings
        Solo Admin/Profesor pueden ejecutar esto
        
        POST /api/chat/rebuild/
        {
            "confirm": true
        }
        """
        # Validar request
        serializer = RebuildIndexSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verificar si ya hay una reconstrucción en curso
        index_status = IndexStatus.get_current_status()
        
        if index_status.is_rebuilding:
            return Response(
                {
                    'error': 'Ya hay una reconstrucción en curso',
                    'is_rebuilding': True
                },
                status=status.HTTP_409_CONFLICT
            )
        
        # Iniciar reconstrucción en segundo plano
        start_rebuild_index(request.user.user_id)
        
        return Response(
            {
                'message': 'Reconstrucción del índice iniciada. '
                          'El servicio no estará disponible hasta que finalice.',
                'is_rebuilding': True
            },
            status=status.HTTP_202_ACCEPTED
        )


class ChatHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para el historial de consultas"""
    serializer_class = ChatQuerySerializer
    permission_classes = [IsAuthenticated, CanViewHistory]
    
    def get_queryset(self):
        user = self.request.user
        
        # Admin/Profesor pueden ver todo
        if user.rol == 0:
            queryset = ChatQuery.objects.all()
        else:
            # Otros usuarios solo ven su historial
            queryset = ChatQuery.objects.filter(user=user)
        
        # Filtros opcionales
        user_filter = self.request.query_params.get('user', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        
        if user_filter and user.rol == 0:
            queryset = queryset.filter(user_id=user_filter)
        
        if date_from:
            queryset = queryset.filter(created_at__gte=date_from)
        
        if date_to:
            queryset = queryset.filter(created_at__lte=date_to)
        
        return queryset.order_by('-created_at')