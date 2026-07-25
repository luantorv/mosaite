from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DailyLedgerViewSet

router = DefaultRouter()
router.register(r'', DailyLedgerViewSet, basename='daily')

urlpatterns = [
    path('', include(router.urls)),
]
