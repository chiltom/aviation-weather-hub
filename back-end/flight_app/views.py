from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from .models import Flight, Brief, Hazard
from .serializers import FlightSerializer, BriefSerializer, HazardSerializer
from user_app.views import TokenReq


class All_flights(TokenReq):
    def get(self, request):
        flights = get_list_or_404(request.user.flights.all())
        ser_flights = FlightSerializer(flights, many=True)
        return Response(ser_flights.data, status=HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        new_flight = FlightSerializer(data=data)
        if new_flight.is_valid():
            new_flight.save()
            return Response(new_flight.data, status=HTTP_201_CREATED)
        return Response(new_flight.errors, status=HTTP_400_BAD_REQUEST)


class A_flight(TokenReq):
    def add_briefs(self, flight, lst_of_brief_ids):
        for brief_id in lst_of_brief_ids:
            if get_object_or_404(Brief, id=brief_id):
                flight.briefs.add(brief_id)
                flight.save()

    def get_flight(self, request, flight_id):
        return get_object_or_404(request.user.flights, id=flight_id)

    def get(self, request, flight_id):
        return Response(FlightSerializer(self.get_flight(request, flight_id)).data, status=HTTP_200_OK)

    def put(self, request, flight_id):
        data = request.data.copy()
        curr_flight = self.get_flight(request, flight_id)
        ser_flight = FlightSerializer(curr_flight, data=data, partial=True)
        if ser_flight.is_valid():
            ser_flight.save()
            if data.get("lst_of_briefs"):
                self.add_briefs(flight=get_object_or_404(
                    Flight, id=flight_id), lst_of_brief_ids=data.get("lst_of_briefs"))
            return Response(ser_flight.data, status=HTTP_200_OK)
        return Response(ser_flight.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, flight_id):
        curr_flight = self.get_flight(request, flight_id)
        curr_flight.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class All_briefs(TokenReq):
    def get(self, request, flight_id):
        try:
            briefs = BriefSerializer(
                request.user.flights.get(id=flight_id).briefs, many=True)
            return Response(briefs.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request, flight_id):
        data = request.data.copy()
        get_object_or_404(request.user.flights, id=flight_id)
        data["flight"] = flight_id
        new_brief = BriefSerializer(data=data)
        if new_brief.is_valid():
            new_brief.save()
            return Response(new_brief.data, status=HTTP_201_CREATED)
        return Response(new_brief.errors, status=HTTP_400_BAD_REQUEST)


class A_brief(TokenReq):
    def add_hazards(self, brief, lst_of_hazard_ids):
        for hazard_id in lst_of_hazard_ids:
            if get_object_or_404(Hazard, id=hazard_id):
                brief.hazards.add(hazard_id)
                brief.save()

    def get(self, request, flight_id, brief_id):
        brief = BriefSerializer(get_object_or_404(Brief, id=brief_id))
        return Response(brief.data, status=HTTP_200_OK)

    def put(self, request, flight_id, brief_id):
        data = request.data.copy()
        brief = get_object_or_404(Brief, id=brief_id)
        ser_brief = BriefSerializer(brief, data=data, partial=True)
        if ser_brief.is_valid():
            ser_brief.save()
            if data.get("lst_of_hazards"):
                self.add_hazards(
                    brief=brief, lst_of_hazard_ids=data.get("lst_of_hazards"))
            return Response(ser_brief.data, status=HTTP_200_OK)
        return Response(ser_brief.errors, status=HTTP_400_BAD_REQUEST)
