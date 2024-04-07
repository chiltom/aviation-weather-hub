from django.db import models
from django.core import validators as v
from user_app.models import User
from .validators import (
    validate_icao_code,
    validate_airport_name,
    validate_city_name,
    validate_state_abbreviation
)


class Airport(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="airports")
    icao_code = models.CharField(max_length=4, validators=[v.MinLengthValidator(
        4), v.MaxLengthValidator(4), validate_icao_code])
    name = models.CharField(max_length=100, validators=[
                            v.MinLengthValidator(1), validate_airport_name])


# Ensure that the Decimal class is used with lat and lon to keep precision
class Named_location(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="named_locations")
    city = models.CharField(max_length=40, validators=[
                            v.MinLengthValidator(1), validate_city_name])
    state = models.CharField(max_length=2, validators=[
                             validate_state_abbreviation])
    latitude = models.DecimalField(max_digits=8, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
