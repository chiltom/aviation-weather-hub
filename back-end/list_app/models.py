from django.db import models
from django.core import validators as v
from user_app.models import User


class List(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="lists")
    name = models.CharField(max_length=50, unique=True,
                            validators=[v.MinLengthValidator(1)])
    completed = models.BooleanField(default=False)
    # tasks = foreign key relationship, one-to-many from list to tasks

    def __str__(self) -> str:
        return f"List: {self.name}"


class Task(models.Model):
    list = models.ForeignKey(
        List, on_delete=models.CASCADE, related_name="tasks")
    name = models.CharField(max_length=255, validators=[
                            v.MinLengthValidator(1)])
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Task: {self.name}"
