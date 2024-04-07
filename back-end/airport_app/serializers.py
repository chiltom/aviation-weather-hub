from rest_framework.serializers import ModelSerializer
from .models import Airport


class AirportSerializer(ModelSerializer):
    class Meta:
        model = Airport
        fields = "__all__"
