from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from dotenv import load_dotenv
import requests
import os
from user_app.views import TokenReq


class A_airport_metar(TokenReq):
    # TODO: Make sure to include on front end that multiple stations can be checked
    # by input of multiple icao_codes with comma delimiter
    # Example: KJFK,KLAX,KMIA
    def get(self, request, icao):
        load_dotenv()
        endpoint = f"https://api.checkwx.com/taf/{icao}"
        response = requests.get(
            endpoint, headers={"X-API-Key": os.environ['CHECK_WX_KEY']})
        responseJSON = response.json()
        return Response(responseJSON, status=HTTP_200_OK)


class A_coordinate_metar(TokenReq):
    def get(self, request, lat, lon):
        pass
