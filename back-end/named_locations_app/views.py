from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from decimal import Decimal
from .models import Named_location
from .serializers import Named_locationSerializer
from user_app.views import TokenReq


class All_named_locations(TokenReq):
    def get(self, request):
        named_locations = get_list_or_404(request.user.named_locations.all())
        ser_named_locations = Named_locationSerializer(
            named_locations, many=True)
        return Response(ser_named_locations.data, status=HTTP_200_OK)

    def post(self, request):
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
    def get(self, request, city):
        return Response(Named_locationSerializer(
            get_object_or_404(request.user.named_locations, city=city.title())).data,
            status=HTTP_200_OK
        )
