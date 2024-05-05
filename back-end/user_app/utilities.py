"""Custom classes and methods for the User app.

Classes:
    HttpOnlyTokenAuthentication
"""

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.http import HttpRequest


class HttpOnlyTokenAuthentication(TokenAuthentication):
    """A class that authenticates Users with the HTTP only cookie token passed with their request.

    Extends:
        TokenAuthentication (class): The rest_framework TokenAuthentication class.
    
    Methods:
        get_auth_token_from_cookie(request) -> str
        authenticate(request) -> tuple[HttpRequest, Token]
    """

    def get_auth_token_from_cookie(self, request: HttpRequest) -> str:
        """Strips an authentication Token key from the request cookies.

        Args:
            request (HttpRequest): The request from the frontend with data and
            proper authentication.

        Returns:
            str: The Token key.
        """

        return request.COOKIES.get('token')

    def authenticate(self, request: HttpRequest) -> tuple[HttpRequest, Token]:
        """Authenticates the credentials sent with a request from the frontend.

        Args:
            request (HttpRequest): The request from the frontend with data and
            proper authentication.

        Returns:
            tuple[HttpRequest, Token]: A tuple containing the request user and their token.
        """

        auth_token = self.get_auth_token_from_cookie(request)
        if not auth_token:
            return None
        return self.authenticate_credentials(auth_token)
