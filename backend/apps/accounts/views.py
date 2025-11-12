from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Account
from django.db import models
from .serializers import AccountSerializer, AccountListSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AccountListSerializer
        return AccountSerializer
    
    def get_queryset(self):
        queryset = Account.objects.all().order_by('code')
        
        # Filtros
        status_filter = self.request.query_params.get('status', None)
        nature_filter = self.request.query_params.get('nature', None)
        search = self.request.query_params.get('search', None)
        
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter == 'true')
        
        if nature_filter is not None:
            queryset = queryset.filter(nature=nature_filter == 'true')
        
        if search:
            queryset = queryset.filter(
                models.Q(code__icontains=search) |
                models.Q(name__icontains=search)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Obtiene solo las cuentas activas"""
        accounts = Account.objects.filter(status=True).order_by('code')
        serializer = AccountListSerializer(accounts, many=True)
        return Response(serializer.data)