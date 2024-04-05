from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from .validators import validate_display_name, validate_first_name, validate_last_name

# Create your models here.


class User(AbstractUser):
    # username = None
    email = models.EmailField(
        unique=True, verbose_name='email address', max_length=255)
    display_name = models.CharField(
        max_length=50, validators=[validate_display_name, v.MinLengthValidator(6), v.MaxLengthValidator(25)])
    first_name = models.CharField(
        max_length=50, validators=[validate_first_name])
    last_name = models.CharField(
        max_length=50, validators=[validate_last_name])
    # list = foreign key, one-to-many relationship

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [display_name, first_name, last_name]
    # locations from many-to-many relationship
    # lists from many-to-many relationship
