"""Module that tests Airport views.

Classes:
    TestAirportCrud
"""

import json
from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase


class TestAirportCrud(APITestCase):
    """Tests the CRUD capabilities of the Airport views.

    Extends:
        APITestCase (class): The rest_framework APITestCase class.

    Methods:
        setUp() -> None
        test_001_all_airports_post() -> None
        test_002_all_airports_get() -> None
        test_003_a_airport_get() -> None
        test_004_a_airport_put() -> None
        test_005_a_airport_delete() -> None
    """

    def setUp(self) -> None:
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies

    def test_001_all_airports_post(self) -> None:
        """Tests the post request method for the AllAirports view."""
        answer = {
            "id": 1,
            "user": 1,
            "icao_code": "KSVN",
            "name": "Hunter AAF"
        }
        response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    def test_002_all_airports_get(self) -> None:
        """Tests the get request method for the AllAirports view."""
        answer = [{
            "id": 2,
            "user": 2,
            "icao_code": "KSVN",
            "name": "Hunter AAF"
        }]
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_airports"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_003_a_airport_get(self) -> None:
        """Tests the get request method for the AnAirport view."""
        answer = {
            "id": 3,
            "user": 3,
            "icao_code": "KSVN",
            "name": "Hunter AAF"
        }
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_airport", args=["ksvn"]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_004_a_airport_put(self) -> None:
        """Tests the put request method for the AnAirport view."""
        answer = {
            "id": 4,
            "user": 4,
            "icao_code": "EVGA",
            "name": "Lielvarde, LV"
        }
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_airport", args=["ksvn"]),
            data=json.dumps({"name": "Lielvarde, LV", "icao_code": "EVGA"}),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_005_a_airport_delete(self) -> None:
        """Tests the delete request method for the AnAirport view."""
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_airport", args=['ksvn']))
        self.assertEqual(response.status_code, 204)
