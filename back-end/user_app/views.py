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
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from datetime import datetime, timedelta
from .models import User
from .utilities import HttpOnlyTokenAuthentication


def create_http_only_cookie_from_response(_response: Response, token: Token) -> Response:
    """Sets an HTTP only authentication cookie with the Token argument on the Response argument.

    Args:
        _response (Response): The Response that needs a cookie to be set.
        token (Token): The authorization Token to be used in the cookie.

    Returns:
        Response: The Response with the authentication cookie.
    """

    life_time = datetime.now() + timedelta(days=7)
    format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S UTC")
    _response.set_cookie(
        key="token",
        value=token.key,
        httponly=True,
        secure=True,
        samesite="Lax",
        expires=format_life_time
    )
    return _response


class TokenReq(APIView):
    """The class that sets the permission and authentication classes for all views that inherit it.

    Inherits from the APIView class to ensure that all view functionality and attributes are present.

    Args:
        APIView (class): The rest_framework APIView class.
    """

    authentication_classes = [HttpOnlyTokenAuthentication]
    permission_classes = [IsAuthenticated]


class Info(TokenReq):
    """The view that holds the methods to get or update a User's information.

    Args:
        TokenReq (class): The class that enables the view with proper authentication and permissions.
    """

    def get(self, request: HttpRequest) -> Response:
        """Gets a User's information.

        Args:
            request (HttpRequest): The request from the frontend with proper authentication.

        Returns:
            Response: The User's information and proper HTTP status code.
        """

        data = {"email": request.user.email, "display_name": request.user.display_name,
                "first_name": request.user.first_name, "last_name": request.user.last_name}
        return Response(data, status=HTTP_200_OK)

    def put(self, request: HttpRequest) -> Response:
        """Updates a User's information.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.

        Returns:
            Response: The User's updated information and proper HTTP status code.
        """

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
    """The view that holds the method for a User to create an account.

    Args:
        APIView (class): The class that enables the view.
    """

    def post(self, request: HttpRequest) -> Response:
        """Creates a new User.

        Args:
            request (HttpRequest): The request from the frontend with proper data.

        Returns:
            Response: The new User's information with an authentication cookie and proper HTTP status code.
        """

        data = request.data.copy()
        data['username'] = data.get("email")
        new_user = User(**data)
        try:
            new_user.full_clean()
            new_user = User.objects.create_user(**data)
            token = Token.objects.create(user=new_user)
            login(request, new_user)
            _response = Response(
                {
                    "display_name": new_user.display_name,
                    "email": new_user.email,
                    "first_name": new_user.first_name,
                    "last_name": new_user.last_name,
                },
                status=HTTP_201_CREATED)
            return create_http_only_cookie_from_response(_response, token)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    """The view that holds the method for a User to login to their account.

    Args:
        APIView (class): The class that enables the view.
    """

    def post(self, request: HttpRequest) -> Response:
        """Logs a User into their account.

        Args:
            request (HttpRequest): The request from the frontend with the User's credentials.

        Returns:
            Response: The User's information with an authentication cookie and proper HTTP status code.
        """

        data = request.data.copy()
        user = authenticate(username=data.get("email"),
                            password=data.get("password"))
        if user:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            _response = Response(
                {
                    "display_name": user.display_name,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                status=HTTP_200_OK)
            return create_http_only_cookie_from_response(_response, token)
        return Response("No user matching these credentials", status=HTTP_404_NOT_FOUND)


class Log_out(TokenReq):
    """The view that holds the method for a User to log out of their session.

    Args:
        TokenReq (class): The class that enables the view with proper authentication and permissions.
    """

    def post(self, request: HttpRequest) -> Response:
        """Logs a User out of their session and removes their credentials and cookie.

        Args:
            request (HttpRequest): The request from the frontend with proper authentication.

        Returns:
            Response: The proper HTTP status code.
        """

        request.user.auth_token.delete()
        logout(request)
        _response = Response(status=HTTP_204_NO_CONTENT)
        _response.delete_cookie("token")
        return _response


class Master_Sign_Up(APIView):
    """The view that holds the method to create a superuser account.

    Args:
        APIView (class): The class that enables the view.
    """

    def post(self, request: HttpRequest) -> Response:
        """Creates a new superuser account.

        Args:
            request (HttpRequest): The request from the frontend with the new superuser's information.

        Returns:
            Response: The new superuser's data with an authentication cookie and proper HTTP status code.
        """

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
            _response = Response({"master_user": master_user.display_name,
                                 "email": master_user.email}, status=HTTP_201_CREATED)
            return create_http_only_cookie_from_response(_response, token)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
