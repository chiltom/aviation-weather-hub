from django.urls import path
from .views import All_airports

urlpatterns = [
    path('', All_airports.as_view(), name="all_airports"),
]
