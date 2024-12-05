from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.

class User(AbstractUser):
    last_login = models.DateTimeField(null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username