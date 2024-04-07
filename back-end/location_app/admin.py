from django.contrib import admin
from .models import Airport, Named_location

# Register your models here.
admin.site.register([Airport, Named_location])
