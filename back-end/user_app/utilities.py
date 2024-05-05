from rest_framework.authentication import TokenAuthentication
from django.http import HttpRequest
from rest_framework.authtoken.models import Token


class HttpOnlyTokenAuthentication(TokenAuthentication):
    """A class that authenticates Users with the HTTP only cookie token passed with their request.

    Args:
        TokenAuthentication (class): The rest_framework TokenAuthentication class.
    """
    
    def get_auth_token_from_cookie(self, request: HttpRequest) -> str:
        """Strips an authentication Token key from the request cookies.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authorization header.

        Returns:
            str: The Token key.
        """
        
        return request.COOKIES.get('token')

    def authenticate(self, request: HttpRequest) -> tuple[HttpRequest.user, Token]:
        """Authenticates the credentials sent with a request from the frontend.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.

        Returns:
            tuple[HttpRequest.user, Token]: A tuple containing the request user and their token.
        """
        
        auth_token = self.get_auth_token_from_cookie(request)
        if not auth_token:
            return None
        return self.authenticate_credentials(auth_token)
