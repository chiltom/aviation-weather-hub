from django.urls import path
from .views import A_coordinate

urlpatterns = [
    path('city/<str:city>/country/<str:country_code>/', A_coordinate.as_view(), name="a_coordinate")
]