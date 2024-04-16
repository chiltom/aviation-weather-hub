from django.db import models
from django.core import validators as v
from user_app.models import User
from .validators import (
    validate_icao_code,
    validate_airport_name,
)


class Airport(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="airports")
    icao_code = models.CharField(max_length=4, validators=[v.MinLengthValidator(
        4), v.MaxLengthValidator(4), validate_icao_code])
    name = models.CharField(max_length=100, validators=[
                            v.MinLengthValidator(1), validate_airport_name])

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['icao_code', 'user'], name='unique icao code per user')
        ]

    def __str__(self) -> str:
        return f"{self.icao_code}: {self.name}"
