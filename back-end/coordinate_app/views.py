from user_app.views import TokenReq
from rest_framework.response import Response
from dotenv import load_dotenv
import requests
import os


class A_coordinate(TokenReq):
    
    def get(self, request, city, country_code):
        load_dotenv()
        endpoint = f"""https://api.openweathermap.org/data/2.5/weather?q={city},{country_code}&appid={os.environ['OPENWX_KEY']}"""
        response = requests.get(endpoint)
        responseJSON = response.json()
        client_response = {
            "latitude": responseJSON['coord']['lat'],
            "longitude": responseJSON['coord']['lon']
        }
        # print(responseJSON)
        return Response(client_response)
