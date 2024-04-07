from rest_framework.serializers import ModelSerializer
from .models import Airport, Named_location


class AirportSerializer(ModelSerializer):
    class Meta:
        model = Airport
        fields = "__all__"


class Named_locationSerializer(ModelSerializer):
    class Meta:
        model = Named_location
        fields = "__all__"
