from user_app.views import TokenReq
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from dotenv import load_dotenv
import requests
import os
import json


class A_coordinate(TokenReq):

    def get(self, request, city, country_code):
        load_dotenv()
        endpoint = f"""https://api.openweathermap.org/data/2.5/weather?q={
            city},{country_code}&appid={os.environ['OPENWX_KEY']}"""
        response = requests.get(endpoint)
        if response.status_code == 404:
            return Response(json.dumps({'Error': 'City within country not found'}), status=HTTP_404_NOT_FOUND)
        responseJSON = response.json()
        print(responseJSON)
        client_response = {
            "city": responseJSON['name'],
            "country": responseJSON['sys']['country'],
            "latitude": responseJSON['coord']['lat'],
            "longitude": responseJSON['coord']['lon']
        }
        return Response(client_response, status=HTTP_200_OK)
