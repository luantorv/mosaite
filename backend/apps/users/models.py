from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('status', 0)
        extra_fields.setdefault('rol', 0)
        
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    name = models.TextField()
    email = models.TextField(unique=True)
    password = models.TextField()
    created_at = models.TextField()
    updated_at = models.TextField()
    status = models.IntegerField(default=1)  # 0: activo, 1: inactivo
    group = models.TextField()
    rol = models.IntegerField()
    
    # Campos requeridos por Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.email
    
    @property
    def id(self):
        """Alias para user_id para compatibilidad con JWT"""
        return self.user_id
    
    def save(self, *args, **kwargs):
        """Sincronizar status con is_active antes de guardar"""
        # status 0 = activo, status 1 = inactivo
        self.is_active = (self.status == 0)
        super().save(*args, **kwargs)