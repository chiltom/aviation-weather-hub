from rest_framework.serializers import ModelSerializer
from .models import Hazard, Brief, Flight


class HazardSerializer(ModelSerializer):

    class Meta:
        model = Hazard
        fields = "__all__"


class BriefSerializer(ModelSerializer):
    hazards = HazardSerializer(many=True, read_only=True)

    class Meta:
        model = Brief
        fields = "__all__"


class FlightSerializer(ModelSerializer):
    briefs = BriefSerializer(many=True, read_only=True)

    class Meta:
        model = Flight
        fields = "__all__"
