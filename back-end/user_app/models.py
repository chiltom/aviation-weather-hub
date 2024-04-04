from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from .validators import validate_display_name, validate_full_name

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(
        max_length=50, validators=[validate_display_name])
    full_name = models.CharField(
        max_length=100, validators=[validate_full_name])
    age = models.PositiveIntegerField(
        default=18, validators=[v.MinValueValidator(16), v.MaxValueValidator(100)])
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [display_name, full_name, age]
    # locations from many-to-many relationship
    # lists from many-to-many relationship
