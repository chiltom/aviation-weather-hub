from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from dotenv import load_dotenv
import requests
import os
import json
from decimal import Decimal
from user_app.views import TokenReq


class A_airport_metar(TokenReq):
    # TODO: Make sure to include on front end that multiple stations can be checked
    # by input of multiple icao_codes with comma delimiter
    # Example: KJFK,KLAX,KMIA
    def get(self, request, icao):
        load_dotenv()
        endpoint = f"https://api.checkwx.com/metar/{icao}"
        response = requests.get(
            endpoint, headers={"X-API-Key": os.environ['CHECK_WX_KEY']})
        responseJSON = response.json()
        if responseJSON['results'] == 0:
            return Response(
                json.loads(
                    json.dumps(
                        {'Error': 'That ICAO code does not match any results.'})),
                status=HTTP_404_NOT_FOUND)
        lst_of_codes = icao.split(",")
        client_response = {}
        for idx, code in enumerate(lst_of_codes):
            client_response[code] = responseJSON['data'][idx]
        return Response(client_response, status=HTTP_200_OK)


class A_coordinate_metar(TokenReq):
    def get(self, request, lat, lon):
        load_dotenv()
        request_lat = str(round(Decimal(lat), 2))
        request_lon = str(round(Decimal(lon), 2))
        endpoint = f"""https://api.checkwx.com/metar/lat/{
            request_lat}/lon/{request_lon}/"""
        response = requests.get(
            endpoint, headers={"X-API-Key": os.environ['CHECK_WX_KEY']})
        responseJSON = response.json()
        if responseJSON['results'] == 0:
            return Response(
                json.loads(
                    json.dumps(
                        {'Error': 'That location does not have a nearby airport putting out METARs.'})),
                status=HTTP_404_NOT_FOUND)
        return Response(responseJSON['data'][0], status=HTTP_200_OK)
