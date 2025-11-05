from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from datetime import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from .utils import get_role_display_name, validate_role_for_system


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizado para login que valida el estado del usuario
    """
    def validate(self, attrs):
        # Primero obtenemos el usuario
        try:
            user = User.objects.get(email=attrs.get('email'))
            
            # Verificar si el usuario está inactivo
            if user.status != 0:
                raise serializers.ValidationError(
                    'Esta cuenta está inactiva. Contacta al administrador.'
                )
            
        except User.DoesNotExist:
            pass  # Dejar que la validación normal maneje esto
        
        # Llamar a la validación original
        data = super().validate(attrs)
        
        return data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    role_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['user_id', 'name', 'email', 'password', 'created_at', 'updated_at', 
                  'status', 'group', 'rol', 'role_name']
        read_only_fields = ['user_id', 'created_at', 'updated_at', 'role_name']
    
    def get_role_name(self, obj):
        """Retorna el nombre del rol según el modo del sistema"""
        return get_role_display_name(obj.rol)
    
    def validate_rol(self, value):
        """Valida que el rol sea válido para el modo actual"""
        if not validate_role_for_system(value):
            raise serializers.ValidationError(
                "Rol inválido para el modo actual del sistema"
            )
        return value
    
    def create(self, validated_data):
        now = datetime.now().isoformat()
        validated_data['created_at'] = now
        validated_data['updated_at'] = now
        
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        validated_data['updated_at'] = datetime.now().isoformat()
        
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance


class UserListSerializer(serializers.ModelSerializer):
    """Serializer más liviano para listados"""
    role_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['user_id', 'name', 'email', 'status', 'group', 'rol', 'role_name', 'created_at']
    
    def get_role_name(self, obj):
        """Retorna el nombre del rol según el modo del sistema"""
        return get_role_display_name(obj.rol)