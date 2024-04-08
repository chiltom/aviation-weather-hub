from django.urls import path
from .views import A_airport_metar, A_coordinate_metar

urlpatterns = [
    path('airport/<str:icao>/', A_airport_metar.as_view(), name="a_airport_metar"),
    path('lat/<str:lat>/lon/<str:lon>/', A_coordinate_metar.as_view(), name="a_coordinate_metar")
]
