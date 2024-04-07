from rest_framework.authentication import TokenAuthentication


class HttpOnlyTokenAuthentication(TokenAuthentication):
    def get_auth_token_from_cookie(self, request):
        # Extract the token from the 'auth_token' HttpOnly cookie
        return request.COOKIES.get('token')

    def authenticate(self, request):
        auth_token = self.get_auth_token_from_cookie(request)
        if not auth_token:
            return None
        return self.authenticate_credentials(auth_token)
