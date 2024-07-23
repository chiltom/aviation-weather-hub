from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json

# Test airport CRUD capabilities


class Test_airport_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        # self.client.cookies = sign_up_response.client.cookies
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {
                                response_body['token']}")

    # Test post method on All_airports view

    def test_001_all_airports_post(self):
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

    # Test get method on all_airports view
    def test_002_all_airports_get(self):
        answer = [{
            "id": 2,
            "user": 2,
            "icao_code": "KSVN",
            "name": "Hunter AAF"
        }]
        airport_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_airports"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_003_a_airport_get(self):
        answer = {
            "id": 3,
            "user": 3,
            "icao_code": "KSVN",
            "name": "Hunter AAF"
        }
        airport_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_airport", args=["ksvn"]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_004_a_airport_put(self):
        answer = {
            "id": 4,
            "user": 4,
            "icao_code": "EVGA",
            "name": "Lielvarde, LV"
        }
        airport_post_response = self.client.post(
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

    def test_005_a_airport_delete(self):
        airport_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({"icao_code": "KSVN", "name": "Hunter AAF"}),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_airport", args=['ksvn']))
        self.assertEqual(response.status_code, 204)
