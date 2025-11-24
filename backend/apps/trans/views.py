from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Transaction, TransactionEntry
from .serializers import TransactionSerializer, TransactionListSerializer
from .permissions import CanManageTransactions


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, CanManageTransactions]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TransactionListSerializer
        return TransactionSerializer
    
    def get_queryset(self):
        queryset = Transaction.objects.all().select_related('user').prefetch_related('entries__acc')
        
        # Filtros
        status_filter = self.request.query_params.get('status', None)
        user_filter = self.request.query_params.get('user', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        search = self.request.query_params.get('search', None)
        
        if status_filter is not None:
            try:
                status_value = int(status_filter)
                queryset = queryset.filter(status=status_value)
            except ValueError:
                pass
        
        if user_filter:
            queryset = queryset.filter(user_id=user_filter)
        
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        
        if date_to:
            queryset = queryset.filter(date__lte=date_to)
        
        if search:
            queryset = queryset.filter(
                Q(legend__icontains=search) |
                Q(trans_id__icontains=search)
            )
        
        return queryset
    
    def perform_create(self, serializer):
        """Asignar usuario actual a la transacción"""
        serializer.save(user=self.request.user)
    
    def perform_update(self, serializer):
        """Prevenir edición de transacciones cerradas"""
        if self.get_object().status == Transaction.STATUS_CLOSED:
            return Response(
                {'error': 'No se puede editar una transacción cerrada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()
    
    def perform_destroy(self, instance):
        """Prevenir eliminación de transacciones cerradas"""
        if instance.status == Transaction.STATUS_CLOSED:
            return Response(
                {'error': 'No se puede eliminar una transacción cerrada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Obtiene las transacciones más recientes"""
        limit = int(request.query_params.get('limit', 10))
        transactions = self.get_queryset()[:limit]
        # Usar el serializer completo en lugar del ligero para incluir entries con accounts
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_status(self, request, pk=None):
        """
        Cambia el estado de la transacción siguiendo el ciclo:
        0 (Por verificar) -> 1 (Verificado) -> 0 (vuelve al inicio)
        
        Estado 2 (Cerrado) solo se puede establecer cuando la transacción
        se agregue a un libro diario (funcionalidad futura)
        """
        transaction = self.get_object()
        
        # No permitir cambiar estado de transacciones cerradas
        if transaction.status == Transaction.STATUS_CLOSED:
            return Response(
                {
                    'error': 'No se puede cambiar el estado de una transacción cerrada',
                    'message': 'Esta transacción está en un libro diario y no puede ser modificada'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Ciclar entre 0 y 1
        if transaction.status == Transaction.STATUS_TO_CHECK:
            transaction.status = Transaction.STATUS_CHECKED
        else:
            transaction.status = Transaction.STATUS_TO_CHECK
        
        transaction.save()
        
        serializer = self.get_serializer(transaction)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def close(self, request, pk=None):
        """
        Cierra una transacción (estado 2).
        Esta acción debería ser llamada cuando la transacción
        se agregue a un libro diario.
        """
        transaction = self.get_object()
        
        if transaction.status == Transaction.STATUS_CLOSED:
            return Response(
                {'error': 'La transacción ya está cerrada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        transaction.status = Transaction.STATUS_CLOSED
        transaction.save()
        
        serializer = self.get_serializer(transaction)
        return Response(serializer.data)