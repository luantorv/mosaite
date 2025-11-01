from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Role, UserRole


class RoleSerializer(serializers.ModelSerializer):
    """Serializer para Roles"""
    
    class Meta:
        model = Role
        fields = ['role_id', 'name']


class UserRoleSerializer(serializers.ModelSerializer):
    """Serializer para UserRole con información del rol"""
    
    role_name = serializers.CharField(source='role.name', read_only=True)
    role_id = serializers.IntegerField(source='role.role_id', read_only=True)
    
    class Meta:
        model = UserRole
        fields = ['role_id', 'role_name']


class UserSerializer(serializers.ModelSerializer):
    """Serializer principal para usuarios"""
    
    roles = UserRoleSerializer(source='user_roles', many=True, read_only=True)
    role_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'user_id', 
            'name', 
            'email', 
            'password',
            'created_at', 
            'updated_at', 
            'status', 
            'group',
            'roles',
            'role_ids'
        ]
        read_only_fields = ['user_id', 'created_at', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate_email(self, value):
        """Valida que el email sea único"""
        user = self.instance
        if User.objects.exclude(pk=user.pk if user else None).filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con este email.")
        return value.lower()
    
    def validate_role_ids(self, value):
        """Valida que los roles existan y sean válidos para el modo actual"""
        if not value:
            return value
        
        # Importar Config aquí para evitar importación circular
        from backend.apps.config.models import Config
        config = Config.get_config()
        
        if not config:
            raise serializers.ValidationError("No se ha configurado el sistema.")
        
        system_mode = config.system_mode
        
        # Verificar que todos los roles existan
        roles = Role.objects.filter(role_id__in=value)
        if len(roles) != len(value):
            raise serializers.ValidationError("Uno o más roles no existen.")
        
        # Verificar que los roles sean válidos para el modo actual
        for role in roles:
            if not Role.is_valid_role_for_mode(role.name, system_mode):
                raise serializers.ValidationError(
                    f"El rol '{role.name}' no es válido para el modo actual del sistema."
                )
        
        return value
    
    def create(self, validated_data):
        """Crea un usuario con sus roles"""
        role_ids = validated_data.pop('role_ids', [])
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        # Asignar roles
        if role_ids:
            for role_id in role_ids:
                UserRole.objects.create(user=user, role_id=role_id)
        
        return user
    
    def update(self, instance, validated_data):
        """Actualiza un usuario y sus roles"""
        role_ids = validated_data.pop('role_ids', None)
        password = validated_data.pop('password', None)
        
        # Actualizar campos básicos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Actualizar password si se proporciona
        if password:
            instance.set_password(password)
        
        instance.save()
        
        # Actualizar roles si se proporcionan
        if role_ids is not None:
            # Eliminar roles actuales
            UserRole.objects.filter(user=instance).delete()
            # Asignar nuevos roles
            for role_id in role_ids:
                UserRole.objects.create(user=instance, role_id=role_id)
        
        return instance


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer específico para crear usuarios"""
    
    password_confirm = serializers.CharField(write_only=True, required=True)
    role_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=True
    )
    
    class Meta:
        model = User
        fields = [
            'name', 
            'email', 
            'password',
            'password_confirm',
            'status', 
            'group',
            'role_ids'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, data):
        """Validación de passwords coincidentes"""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                "password_confirm": "Las contraseñas no coinciden."
            })
        
        # Validar complejidad de password
        validate_password(data['password'])
        
        return data
    
    def validate_role_ids(self, value):
        """Valida que se proporcione al menos un rol"""
        if not value:
            raise serializers.ValidationError("Debe asignar al menos un rol.")
        
        # Usar la misma validación de UserSerializer
        serializer = UserSerializer()
        return serializer.validate_role_ids(value)
    
    def create(self, validated_data):
        """Crea un usuario"""
        validated_data.pop('password_confirm')
        serializer = UserSerializer()
        return serializer.create(validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer específico para actualizar usuarios"""
    
    password = serializers.CharField(write_only=True, required=False)
    password_confirm = serializers.CharField(write_only=True, required=False)
    role_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'name', 
            'email', 
            'password',
            'password_confirm',
            'status', 
            'group',
            'role_ids'
        ]
        extra_kwargs = {
            'name': {'required': False},
            'email': {'required': False},
            'status': {'required': False},
            'group': {'required': False},
        }
    
    def validate(self, data):
        """Validación de passwords si se proporcionan"""
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        
        if password or password_confirm:
            if password != password_confirm:
                raise serializers.ValidationError({
                    "password_confirm": "Las contraseñas no coinciden."
                })
            if password:
                validate_password(password)
        
        return data
    
    def update(self, instance, validated_data):
        """Actualiza el usuario"""
        validated_data.pop('password_confirm', None)
        serializer = UserSerializer()
        return serializer.update(instance, validated_data)


class LoginSerializer(serializers.Serializer):
    """Serializer para login"""
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        """Valida las credenciales"""
        email = data.get('email', '').lower()
        password = data.get('password', '')
        
        if not email or not password:
            raise serializers.ValidationError("Email y contraseña son requeridos.")
        
        return data


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para cambiar contraseña"""
    
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password_confirm = serializers.CharField(write_only=True, required=True)
    
    def validate(self, data):
        """Validación de contraseñas"""
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError({
                "new_password_confirm": "Las contraseñas no coinciden."
            })
        
        validate_password(data['new_password'])
        return data