from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    """Manager personalizado para el modelo User"""
    
    def create_user(self, email, name, password=None, **extra_fields):
        """Crea y guarda un usuario regular"""
        if not email:
            raise ValueError('El email es obligatorio')
        if not name:
            raise ValueError('El nombre es obligatorio')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password=None, **extra_fields):
        """Crea y guarda un superusuario"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('status', 1)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')
        
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Modelo personalizado de Usuario"""
    
    user_id = models.AutoField(primary_key=True)
    name = models.TextField()
    email = models.TextField(unique=True)
    password = models.TextField()
    created_at = models.TextField()
    updated_at = models.TextField()
    status = models.IntegerField(default=1)  # 1: activo, 0: inactivo
    group = models.TextField()
    
    # Campos adicionales requeridos por Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.name} ({self.email})"
    
    def save(self, *args, **kwargs):
        """Override save para manejar timestamps"""
        now = timezone.now().isoformat()
        if not self.created_at:
            self.created_at = now
        self.updated_at = now
        super().save(*args, **kwargs)
    
    def get_roles(self):
        """Obtiene los roles del usuario"""
        return self.user_roles.all()
    
    def has_role(self, role_name):
        """Verifica si el usuario tiene un rol específico"""
        return self.user_roles.filter(role__name=role_name).exists()
    
    def get_role_names(self):
        """Obtiene los nombres de los roles del usuario"""
        return [ur.role.name for ur in self.user_roles.select_related('role')]


class Role(models.Model):
    """Modelo de Roles"""
    
    # Roles para system_mode = True
    ROLE_ADMIN = 'Admin'
    ROLE_MANAGER = 'Manager'
    ROLE_ACCOUNTANT = 'Accountant'
    ROLE_OPERATOR = 'Operator'
    ROLE_VIEWER = 'Viewer'
    
    # Roles para system_mode = False
    ROLE_PROFESSOR = 'Professor'
    ROLE_STUDENT = 'Student'
    
    BUSINESS_ROLES = [
        ROLE_ADMIN,
        ROLE_MANAGER,
        ROLE_ACCOUNTANT,
        ROLE_OPERATOR,
        ROLE_VIEWER
    ]
    
    EDUCATION_ROLES = [
        ROLE_PROFESSOR,
        ROLE_STUDENT
    ]
    
    role_id = models.IntegerField(primary_key=True)
    name = models.TextField()
    
    class Meta:
        db_table = 'roles'
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'
    
    def __str__(self):
        return self.name
    
    @classmethod
    def get_roles_for_mode(cls, system_mode):
        """Obtiene los roles válidos según el modo del sistema"""
        if system_mode:  # Business mode
            return cls.objects.filter(name__in=cls.BUSINESS_ROLES)
        else:  # Education mode
            return cls.objects.filter(name__in=cls.EDUCATION_ROLES)
    
    @classmethod
    def is_valid_role_for_mode(cls, role_name, system_mode):
        """Verifica si un rol es válido para el modo actual"""
        if system_mode:
            return role_name in cls.BUSINESS_ROLES
        else:
            return role_name in cls.EDUCATION_ROLES


class UserRole(models.Model):
    """Tabla intermedia para la relación muchos a muchos entre User y Role"""
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_roles',
        db_column='user_id'
    )
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name='role_users',
        db_column='role_id'
    )
    
    class Meta:
        db_table = 'user_role'
        verbose_name = 'Usuario-Rol'
        verbose_name_plural = 'Usuarios-Roles'
        unique_together = ('user', 'role')
    
    def __str__(self):
        return f"{self.user.name} - {self.role.name}"
