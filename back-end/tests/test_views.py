from django.test import TestCase, Client
from django.urls import reverse

# Test user CRUD capabilities


class Test_user_crud(TestCase):
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
            b'{"user":"tom@tom.com"' in response.content and b"token" in response.content
        )

    # Test user login capabilities by signing one up and logging in afterwards
    def test_002_user_log_in(self):
        client = Client()
        client.post(
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
            b'"user":"tom@tom.com"' in response.content and b"token" in response.content
        )

    # Test getting user info after signup
    def test_003_user_info(self):
        