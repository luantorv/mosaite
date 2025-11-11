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
        queryset = Transaction.objects.all().select_related('user').prefetch_related('entries')
        
        # Filtros
        status_filter = self.request.query_params.get('status', None)
        user_filter = self.request.query_params.get('user', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        search = self.request.query_params.get('search', None)
        
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter == 'true')
        
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
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Obtiene las transacciones más recientes"""
        limit = int(request.query_params.get('limit', 10))
        transactions = self.get_queryset()[:limit]
        serializer = TransactionListSerializer(transactions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_status(self, request, pk=None):
        """Cambia el estado de la transacción (borrador/completada)"""
        transaction = self.get_object()
        transaction.status = not transaction.status
        transaction.save()
        
        serializer = self.get_serializer(transaction)
        return Response(serializer.data)