from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
from decimal import Decimal
import json


class Test_named_location_crud(APITestCase):
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
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response_body['token']}")

    # Test post method on All_named_locations view
    def test_001_all_named_locations_post(self):
        answer = {
            "id": 1,
            "user": 1,
            "city": "Savannah",
            "state": "GA",
            "latitude": "32.076176",
            "longitude": "-81.088371"
        }
        response = self.client.post(
            reverse("all_named_locations"),
            data=json.dumps(
                {
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            ),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    def test_002_all_named_locations_get(self):
        answer = [{
            "id": 2,
            "user": 2,
            "city": "Savannah",
            "state": "GA",
            "latitude": "32.076176",
            "longitude": "-81.088371"
        }]
        post_response = self.client.post(
            reverse("all_named_locations"),
            data=json.dumps(
                {
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            ),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_named_locations"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_003_a_named_location_get(self):
        answer = {
            "id": 3,
            "user": 3,
            "city": "Savannah",
            "state": "GA",
            "latitude": "32.076176",
            "longitude": "-81.088371"
        }
        post_response = self.client.post(
            reverse("all_named_locations"),
            data=json.dumps(
                {
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            ),
            content_type="application/json"
        )
        response = self.client.get(
            reverse("a_named_location", args=["savannah"]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_004_a_named_location_put(self):
        answer = {
            'id': 4,
            'user': 4,
            'city': 'Lielvarde',
            'state': 'LV',
            'latitude': '56.779167',
            'longitude': '24.853889'
        }
        post_response = self.client.post(
            reverse("all_named_locations"),
            data=json.dumps(
                {
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            ),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_named_location", args=['savannah']),
            data=json.dumps(
                {
                    'city': 'Lielvarde',
                    'state': 'LV',
                    'latitude': '56.779167',
                    'longitude': '24.853889'
                }
            ),
            content_type='application/json'
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_005_a_named_location_delete(self):
        post_response = self.client.post(
            reverse("all_named_locations"),
            data=json.dumps(
                {
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            ),
            content_type="application/json"
        )
        response = self.client.delete(
            reverse("a_named_location", args=['savannah']))
        self.assertEqual(response.status_code, 204)
