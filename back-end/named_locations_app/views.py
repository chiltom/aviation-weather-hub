from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from decimal import Decimal
from .serializers import Named_locationSerializer
from user_app.views import TokenReq


class All_named_locations(TokenReq):
    """The view that holds the methods to get all Named Locations or create a new one.

    Args:
        TokenReq (class): The class that enables the view with proper authentication and permissions.
    """
    
    def get(self, request: HttpRequest) -> Response:
        """Gets all of a User's Named Locations.

        Args:
            request (HttpRequest): The request from the frontend with proper authentication.

        Returns:
            Response: All of the User's Named Locations' data with proper HTTP status code.
        """
        
        named_locations = get_list_or_404(request.user.named_locations.all())
        ser_named_locations = Named_locationSerializer(
            named_locations, many=True)
        return Response(ser_named_locations.data, status=HTTP_200_OK)

    def post(self, request: HttpRequest) -> Response:
        """Creates a new Named Location for a User.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.

        Returns:
            Response: The new Named Location's data with proper HTTP status code.
        """
        
        data = request.data.copy()
        data['user'] = request.user.id
        data['latitude'] = Decimal(data['latitude'])
        data['longitude'] = Decimal(data['longitude'])
        new_named_location = Named_locationSerializer(data=data)
        if new_named_location.is_valid():
            new_named_location.save()
            return Response(new_named_location.data, status=HTTP_201_CREATED)
        return Response(new_named_location.errors, status=HTTP_400_BAD_REQUEST)


class A_named_location(TokenReq):
    """The view that holds the methods to get, update, or delete a Named Location.

    Args:
        TokenReq (class): The class that enables the view with proper authentication and permissions.
    """
    
    def get(self, request: HttpRequest, city: str) -> Response:
        """Gets a Named Location's information

        Args:
            request (HttpRequest): The request from the frontend with proper authentication.
            city (str): The city name of the Named Location.

        Returns:
            Response: The Named Location's information with proper HTTP status code.
        """
        
        return Response(Named_locationSerializer(
            get_object_or_404(request.user.named_locations, city=city.title())).data,
            status=HTTP_200_OK
        )

    def put(self, request: HttpRequest, city: str) -> Response:
        """Updates a Named Location's information.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.
            city (str): The city name of the Named Location.

        Returns:
            Response: The Named Location's updated information with proper HTTP status code.
        """
        
        data = request.data.copy()
        if data.get('latitude'):
            data['latitude'] = Decimal(data['latitude'])
        if data.get('longitude'):
            data['longitude'] = Decimal(data['longitude'])
        curr_named_location = get_object_or_404(
            request.user.named_locations, city=city.title())
        ser_named_location = Named_locationSerializer(
            curr_named_location, data=data, partial=True)
        if ser_named_location.is_valid():
            ser_named_location.save()
            return Response(ser_named_location.data, status=HTTP_200_OK)
        return Response(ser_named_location.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request: HttpRequest, city: str) -> Response:
        """Deletes a User's Named Location.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.
            city (str): The city name of the Named Location.

        Returns:
            Response: The proper HTTP status code.
        """
        
        curr_named_location = get_object_or_404(
            request.user.named_locations, city=city.title())
        curr_named_location.delete()
        return Response(status=HTTP_204_NO_CONTENT)
