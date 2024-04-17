from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json

# Test list CRUD capabilities


class Test_list_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies

    # Test post method on All_lists view

    def test_001_all_lists_post(self):
        answer = {
            "id": 1,
            "user": 1,
            "name": "My List",
            "tasks": [],
            "completed": False
        }
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
        list_post_response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_list", args=[5]))
        self.assertEqual(response.status_code, 204)

# Test task CRUD capabilities


class Test_task_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        list_post_response = self.client.post(
            reverse("all_lists"),
            data=json.dumps({"name": "My List", "completed": False}),
            content_type="application/json"
        )

    # Test post method on all_tasks view
    def test_006_all_tasks_post(self):
        answer = {
            "id": 1,
            "list": 6,
            "name": "My Task",
            "completed": False
        }
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
        task_post_response = self.client.post(
            reverse("all_tasks", args=[7]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_tasks", args=[7]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    # Test get method on a_task view
    def test_008_a_task_get(self):
        answer = {
            "id": 3,
            "list": 8,
            "name": "My Task",
            "completed": False
        }
        task_post_response = self.client.post(
            reverse("all_tasks", args=[8]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_task", args=[8, 3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    # Test put method on a_task view
    def test_009_a_task_put(self):
        task_answer = {
            "id": 4,
            "list": 9,
            "name": "My Updated Task",
            "completed": True
        }
        list_answer = {
            "id": 9,
            "user": 9,
            "name": "My List",
            "completed": True,
            "tasks": [
                {
                    'completed': True,
                    'id': 4,
                    'list': 9,
                    'name': 'My Updated Task'
                }
            ]
        }
        task_post_response = self.client.post(
            reverse("all_tasks", args=[9]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        task_update_response = self.client.put(
            reverse("a_task", args=[9, 4]),
            data=json.dumps({"name": "My Updated Task", "completed": True}),
            content_type="application/json"
        )
        list_updated_response = self.client.get(reverse("a_list", args=[9]))
        with self.subTest():
            self.assertEqual(list_updated_response.status_code, 200)
        with self.subTest():
            self.assertEqual(json.loads(
                list_updated_response.content), list_answer)
        with self.subTest():
            self.assertEqual(task_update_response.status_code, 200)
        self.assertEqual(json.loads(task_update_response.content), task_answer)

    # Test delete method on a_task view
    def test_010_a_task_delete(self):
        task_post_response = self.client.post(
            reverse("all_tasks", args=[10]),
            data=json.dumps({"name": "My Task", "completed": False}),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_task", args=[10, 5]))
        self.assertEqual(response.status_code, 204)
