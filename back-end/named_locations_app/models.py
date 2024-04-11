from django.db import models
from django.core import validators as v
from user_app.models import User
from .validators import (
    validate_city_name,
    validate_state_abbreviation
)


# Ensure that the Decimal class is used with lat and lon to keep precision
class Named_location(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="named_locations")
    city = models.CharField(max_length=40, validators=[
                            v.MinLengthValidator(1), validate_city_name])
    country = models.CharField(max_length=2, validators=[
                             validate_state_abbreviation])
    latitude = models.DecimalField(max_digits=8, decimal_places=4)
    longitude = models.DecimalField(max_digits=9, decimal_places=4)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['latitude', 'longitude'], name='unique coordinates')
        ]

    def __str__(self) -> str:
        return f"{self.city}, {self.state}: Lat: {self.latitude} | Lon: {self.longitude}"
