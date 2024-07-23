"""All User request endpoints.

Misc Variables:
    urlpatterns
"""

from django.urls import path
from .views import Info, SignUp, MasterSignUp, LogIn, LogOut

urlpatterns = [
    # The API endpoints for all User methods and functionality.
    path('', Info.as_view(), name="info"),
    path('signup/', SignUp.as_view(), name="signup"),
    path('login/', LogIn.as_view(), name="login"),
    path('logout/', LogOut.as_view(), name="logout"),
    path('master/', MasterSignUp.as_view(), name="master")
]
