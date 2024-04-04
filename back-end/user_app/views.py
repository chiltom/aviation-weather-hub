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

    def put(self, request):
        data = request.data.copy()
        user = User.objects.get(username=request.user.email)
        if data.get("display_name") and "display_name" in data:
            user.display_name = data.get("display_name")
        try:
            user.full_clean()
            user.save()
            user_data = {"email": request.user.email, "display_name": request.user.display_name,
                         "first_name": request.user.first_name, "last_name": request.user.last_name}
            return Response(user_data, status=HTTP_200_OK)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)


class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get("email")
        new_user = User(**data)
        try:
            new_user.full_clean()
            new_user = User.objects.create_user(**data)
            token = Token.objects.create(user=new_user)
            login(request, new_user)
            return Response({"user": new_user.email, "token": token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        user = authenticate(username=data.get("email"),
                            password=data.get("password"))
        if user:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({"user": user.email, "token": token.key}, status=HTTP_200_OK)
        return Response("No user matching these credentials", status=HTTP_404_NOT_FOUND)


class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)


class Master_Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = data.get('email')
        master_user = User(**data)
        try:
            master_user.full_clean()
            master_user = User.objects.create_user(**data)
            master_user.is_staff = True
            master_user.is_superuser = True
            master_user.save()
            token = Token.objects.create(user=master_user)
            login(request, master_user)
            return Response({"master_user": master_user.email, "token": token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
