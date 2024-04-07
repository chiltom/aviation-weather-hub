from django.urls import path
from .views import All_named_locations, A_named_location

urlpatterns = [
    path('', All_named_locations.as_view(), name="all_named_locations"),
    path('<str:city>/', A_named_location.as_view(), name="a_named_location")
]
