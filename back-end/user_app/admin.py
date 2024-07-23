"""Django Admin site registration and configuration."""

from django.contrib import admin
from user_app.models import User

# Registers the User model to the admin site.
admin.site.register([User])
