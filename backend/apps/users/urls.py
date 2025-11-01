from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    RoleViewSet,
    LoginView,
    LogoutView,
    RefreshTokenView,
    ChangePasswordView,
    VerifyTokenView
)

app_name = 'users'

# Router para ViewSets
router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')
router.register(r'roles', RoleViewSet, basename='role')

# URLs de autenticación
auth_urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', RefreshTokenView.as_view(), name='refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('verify/', VerifyTokenView.as_view(), name='verify'),
]

# URLs principales
urlpatterns = [
    path('auth/', include(auth_urlpatterns)),
    path('', include(router.urls)),
]