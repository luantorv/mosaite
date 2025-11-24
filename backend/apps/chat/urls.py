from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, ChatHistoryViewSet

router = DefaultRouter()
router.register(r'', ChatViewSet, basename='chat')
router.register(r'history', ChatHistoryViewSet, basename='chat-history')

urlpatterns = [
    path('', include(router.urls)),
]