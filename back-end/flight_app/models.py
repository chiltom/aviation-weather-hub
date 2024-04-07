from django.db import models
from django.core import validators as v
from django.utils import timezone
from user_app.models import User
from .validators import (
    validate_aircraft_type_model,
    validate_pilot_responsible,
    validate_origin,
    validate_destination
)


class Flight(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="flights")
    tail_number = models.PositiveIntegerField(
        validators=[v.MinValueValidator(100), v.MaxValueValidator(999)])
    aircraft_type_model = models.CharField(
        max_length=20, validators=[validate_aircraft_type_model])
    pilot_responsible = models.CharField(max_length=100, validators=[
                                         validate_pilot_responsible])
    origin = models.CharField(max_length=4, validators=[
                              v.MinLengthValidator(4), validate_origin])
    destination = models.CharField(max_length=4, validators=[
                                   v.MinLengthValidator(4), validate_destination])
    flight_level = models.PositiveIntegerField(default=1000)
    # YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ] format
    takeoff_time = models.DateTimeField(default=timezone.now)
    arrival_time = models.DateTimeField()
    brief_time = models.DateTimeField()
    void_time = models.DateTimeField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['tail_number', 'aircraft_type_model', 'takeoff_time'], name="unique_aircraft_takeoff_time")
        ]

    def __str__(self) -> str:
        return f'''{self.aircraft_type_model} {self.tail_number}:
            Takeoff: {self.takeoff_time}, Arrival: {self.arrival_time}'''
