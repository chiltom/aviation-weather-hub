from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json


# Test flight CRUD capabilities

class Test_flight_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies

    # Test post method on all_flights view

    def test_001_all_flights_post(self):
        answer = {
            "id": 1,
            "user": 1,
            "tail_number": 459,
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "KCHS",
            "flight_level": 3000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }
        response = self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    # Test get method on all_flights view

    def test_002_all_flights_get(self):
        answer = [{
            "id": 2,
            "user": 2,
            "tail_number": 459,
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "KCHS",
            "flight_level": 3000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }]
        flight_post_response = self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_flights"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)
