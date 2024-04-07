from django.urls import path
from .views import All_airports, A_airport

urlpatterns = [
    path('', All_airports.as_view(), name="all_airports"),
    path('<str:icao>/', A_airport.as_view(), name="a_airport"),
]
