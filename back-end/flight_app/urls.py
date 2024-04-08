from django.urls import path
from .views import All_flights

urlpatterns = [
    path('', All_flights.as_view(), name="all_flights")
]
