from rest_framework.serializers import ModelSerializer
from .models import Named_location


class Named_locationSerializer(ModelSerializer):
    class Meta:
        model = Named_location
        fields = "__all__"
