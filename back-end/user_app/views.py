from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.exceptions import ValidationError
from .models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.


class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Info(TokenReq):
    def get(self, request):
        data = {"email": request.user.email, "display_name": request.user.display_name,
                "first_name": request.user.first_name, "last_name": request.user.last_name}
        return Response(data, status=HTTP_200_OK)
