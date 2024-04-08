from django.db import models
from django.core import validators as v
from django.utils import timezone
from user_app.models import User
from .validators import (
    validate_aircraft_type_model,
    validate_pilot_responsible,
    validate_origin,
    validate_destination,
    validate_surface_winds,
    validate_flight_level_winds,
    validate_visibility,
    validate_sky_condition,
    validate_altimeter_setting,
    validate_temperature,
    validate_hazard_type
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
    # Enforce origin and destination with foreign key relationships to airport model,
    # figure out way to access them by icao code
    origin = models.CharField(max_length=4, validators=[
                              v.MinLengthValidator(4), validate_origin])
    destination = models.CharField(max_length=4, validators=[
                                   v.MinLengthValidator(4), validate_destination])
    flight_level = models.PositiveIntegerField(default=1000)
    # YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ] format
    takeoff_time = models.DateTimeField(default=timezone.now)
    arrival_time = models.DateTimeField()
    # briefs = created by foreign key relationship from brief model

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['tail_number', 'aircraft_type_model', 'takeoff_time'], name="unique_aircraft_takeoff_time")
        ]

    def __str__(self) -> str:
        return f'''{self.aircraft_type_model} {self.tail_number}:
            Takeoff: {self.takeoff_time}, Arrival: {self.arrival_time}'''


class Brief(models.Model):
    flight = models.ForeignKey(
        Flight, on_delete=models.CASCADE, related_name="briefs")
    surface_winds = models.CharField(
        max_length=10, validators=[validate_surface_winds])
    flight_level_winds = models.CharField(
        max_length=10, validators=[validate_flight_level_winds])
    visibility = models.CharField(max_length=7, validators=[
                                  v.MinLengthValidator(3), validate_visibility])
    sky_condition = models.CharField(
        max_length=50, validators=[validate_sky_condition])
    temperature = models.CharField(
        max_length=4, validators=[validate_temperature])
    altimeter_setting = models.CharField(
        max_length=5, validators=[validate_altimeter_setting])
    # YYYY-MM-DD[T]HH:MM:SS[Z] format
    brief_time = models.DateTimeField(unique=True)
    void_time = models.DateTimeField()
    # hazards = foreign key relationship from hazard model

    def __str__(self) -> str:
        return f'''Flight: {self.flight} {self.surface_winds} {self.flight_level_winds}
            {self.visibility} {self.sky_condition} {self.temperature} {self.altimeter_setting}'''


class Hazard(models.Model):
    brief = models.ForeignKey(
        Brief, on_delete=models.CASCADE, related_name="hazards")
    type = models.CharField(max_length=30, unique=True,
                            validators=[validate_hazard_type])
    information = models.TextField(default="unknown")

    def __str__(self) -> str:
        return f'{self.type} - {self.information}'
