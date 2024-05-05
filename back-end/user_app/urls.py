from django.urls import path
from .views import Info, Sign_up, Log_in, Log_out, Master_Sign_Up

urlpatterns = [
    # The API endpoints for all User methods and functionality.
    path('', Info.as_view(), name="info"),
    path('signup/', Sign_up.as_view(), name="signup"),
    path('login/', Log_in.as_view(), name="login"),
    path('logout/', Log_out.as_view(), name="logout"),
    path('master/', Master_Sign_Up.as_view(), name="master")
]
