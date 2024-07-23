from django.urls import path
from .views import A_airport_taf, A_coordinate_taf

urlpatterns = [
    # The API endpoints for all TAF methods and functionality.
    path('airports/<str:icao>/', A_airport_taf.as_view(), name="a_airport_taf"),
    path('lat/<str:lat>/lon/<str:lon>/',
         A_coordinate_taf.as_view(), name="a_coordinate_taf")
]
