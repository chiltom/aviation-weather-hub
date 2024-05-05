from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from django.http import HttpRequest
from dotenv import load_dotenv
import requests
import os
import json
from decimal import Decimal
from user_app.views import TokenReq


class A_airport_taf(TokenReq):
    """The view that holds the method to get TAF data for an Airport.

    Args:
        TokenReq (class): The class that enables the view with proper authentication and permissions.
    """

    def get(self, request: HttpRequest, icao: str) -> Response:
        """Gets the lastest TAF for an Airport.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.
            icao (str): The Airport's ICAO code.

        Returns:
            Response: The TAF and proper HTTP status code.
        """

        load_dotenv()
        endpoint = f"https://api.checkwx.com/taf/{icao}"
        response = requests.get(
            endpoint, headers={"X-API-Key": os.environ['CHECK_WX_KEY']})
        responseJSON = response.json()
        if responseJSON['results'] == 0:
            return Response(
                json.loads(
                    json.dumps(
                        {'Error': 'That ICAO code does not match any results.'}
                    )
                ), status=HTTP_404_NOT_FOUND
            )
        lst_of_codes = icao.split(",")
        client_response = {}
        for idx, code in enumerate(lst_of_codes):
            client_response[code.upper()] = responseJSON['data'][idx]
        return Response(client_response, status=HTTP_200_OK)


class A_coordinate_taf(TokenReq):
    """The view that holds the method to get TAF data for a Named Location.

    Args:
        TokenReq (class): The class that enables the view with proper authentication.
    """

    def get(self, request: HttpRequest, lat: str, lon: str) -> Response:
        """Gets the latest TAF for a Named Location.

        Args:
            request (HttpRequest): The request from the frontend with data and proper authentication.
            lat (str): The latitude of the Named Location.
            lon (str): The longitude of the Named Location.

        Returns:
            Response: The TAF and proper HTTP status code.
        """

        load_dotenv()
        request_lat = str(round(Decimal(lat), 2))
        request_lon = str(round(Decimal(lon), 2))
        endpoint = f"""https://api.checkwx.com/taf/lat/{
            request_lat}/lon/{request_lon}/"""
        response = requests.get(
            endpoint, headers={"X-API-Key": os.environ['CHECK_WX_KEY']})
        responseJSON = response.json()
        if responseJSON['results'] == 0:
            return Response(
                json.loads(
                    json.dumps(
                        {'Error': 'That location does not have a nearby airport putting out TAFs.'})),
                status=HTTP_404_NOT_FOUND)
        return Response(responseJSON['data'][0], status=HTTP_200_OK)
