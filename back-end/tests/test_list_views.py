from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
import json

# Test list CRUD capabilities


class Test_list_crud(APITestCase):

    # Test post method on All_lists view
    def test_001_all_lists_post(self):
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
    def test_002_all_lists_get(self):
        answer = [{
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

    # Test get method on a_list view
    def test_003_a_list_get(self):
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

    # Test put method on a_list view
    def test_004_a_list_put(self):
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

    # Test delete method on a_list view
    def test_005_a_list_delete(self):
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
        response = self.client.delete(reverse("a_list", args=[5]))
        self.assertEqual(response.status_code, 204)

# Test task CRUD capabilities


class Test_task_crud(APITestCase):

    # Test post method on all_tasks view
    def test_006_all_tasks_post(self):
        answer = {
            "id": 1,
            "list": 6,
            "name": "My Task",
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
        response = self.client.post(
            reverse("all_tasks", args=[6]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    # Test get method on all_tasks view
    def test_007_all_tasks_get(self):
        answer = [{
            "id": 2,
            "list": 7,
            "name": "My Task",
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
        task_post_response = self.client.post(
            reverse("all_tasks", args=[7]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_tasks", args=[7]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)
