# urls.py (de tu app de autenticación)
from django.urls import path
from .views import LoginView, LogoutView, CurrentUserView, CSRFTokenView, HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('csrf/', CSRFTokenView.as_view(), name='csrf-token'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
]