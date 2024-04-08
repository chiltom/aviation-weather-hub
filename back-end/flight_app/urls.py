from django.urls import path
from .views import All_flights, A_flight

urlpatterns = [
    path('', All_flights.as_view(), name="all_flights"),
    path('<int:flight_id>/', A_flight.as_view(), name="a_flight")
]
