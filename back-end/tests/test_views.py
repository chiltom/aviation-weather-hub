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

class Test_list_crud(APITestCase):
    
    # Test post method on All_lists view
    def test_005_all_lists_post(self):
        answer = {
            "id": 1,
            "user": 1,
            "name": "My List",
            "tasks": [],
            "completed": False
        }
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)
    
    # Test get method on All_lists view
    def test_006_all_lists_get(self):
        answer =[{
            "id": 2,
            "user": 2,
            "name": "My List",
            "tasks": [],
            "completed": False
        }]
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        list_post_response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )
        response = self.client.get(
            reverse("all_lists")
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)
    
    def test_007_a_list_get(self):
        answer = {
            "id": 3,
            "user": 3,
            "name": "My List",
            "tasks": [],
            "completed": False
        }
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        list_post_response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_list", args=[3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)
        
    def test_008_a_list_put(self):
        answer = {
            "id": 4,
            "user": 4,
            "name": "My Fourth List?!?!?!",
            "tasks": [],
            "completed": False
        }
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        self.client.cookies = sign_up_response.client.cookies
        list_post_response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_list", args=[4]),
            data=json.dumps({"name": "My Fourth List?!?!?!"}),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)