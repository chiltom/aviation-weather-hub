from django.urls import path
from .views import All_flights, A_flight, All_briefs, A_brief

urlpatterns = [
    path('', All_flights.as_view(), name="all_flights"),
    path('<int:flight_id>/', A_flight.as_view(), name="a_flight"),
    path('<int:flight_id>/briefs/', All_briefs.as_view(), name="all_briefs"),
    path('<int:flight_id>/briefs/<int:brief_id>/',
         A_brief.as_view(), name="a_brief"),
]
