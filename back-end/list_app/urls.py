from django.urls import path
from .views import All_lists

urlpatterns = [
    path('', All_lists.as_view(), name="all_lists"),
]
