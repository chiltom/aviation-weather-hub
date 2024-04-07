from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from .models import Airport
from .serializers import AirportSerializer
from user_app.views import TokenReq


class All_airports(TokenReq):
    def get(self, request):
        airports = get_list_or_404(request.user.airports.all())
        ser_airports = AirportSerializer(airports, many=True)
        return Response(ser_airports.data, status=HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        new_airport = AirportSerializer(data=data)
        if new_airport.is_valid():
            new_airport.save()
            return Response(new_airport.data, HTTP_201_CREATED)
        return Response(new_airport.errors, status=HTTP_400_BAD_REQUEST)
