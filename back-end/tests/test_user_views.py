from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
import json

# Test user CRUD capabilities


class Test_user_crud(APITestCase):
    # Test user signup capabilities
    def test_001_user_sign_up(self):
        client = Client()
        response = client.post(
            reverse("signup"),
            data={"email": "tom@tom.com", "password": "thomas",
                  "display_name": "chiltom", "first_name": "Tom", "last_name": "Childress"},
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertTrue(
            b'{"user":"chiltom"' in response.content and b'"email":"tom@tom.com"' in response.content
        )

    # Test user login capabilities by signing one up and logging in afterwards
    def test_002_user_log_in(self):
        client = Client()
        response = client.post(
            reverse("signup"),
            data={"email": "tom@tom.com", "password": "thomas",
                  "display_name": "chiltom", "first_name": "Tom", "last_name": "Childress"},
            content_type="application/json"
        )
        response = client.post(
            reverse("login"),
            data={"email": "tom@tom.com", "password": "thomas"},
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertTrue(
            b'"user":"chiltom"' in response.content and b'"email":"tom@tom.com"' in response.content
        )

    # Test getting user info after signup
    def test_003_user_info(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "tom@tom.com", "password": "thomas",
                  "display_name": "chiltom", "first_name": "Tom", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        response = self.client.get(reverse("info"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertTrue(
            b'{"email":"tom@tom.com","display_name":"chiltom","first_name":"Tom","last_name":"Childress"}' in response.content)

    # Test logging user out after signup
    def test_004_user_logout(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "tom@tom.com", "password": "thomas",
                  "display_name": "chiltom", "first_name": "Tom", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        response = self.client.post(reverse("logout"))
        with self.subTest():
            tokens = Token.objects.all()
            self.assertEqual(len(tokens), 0)
        self.assertEqual(response.status_code, 204)

