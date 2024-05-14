"""Module that tests creation of List and Task objects.

Classes:
    TestList
    TestTask
    TestSerializers
"""
from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from list_app.models import List, Task
from list_app.serializers import ListSerializer, TaskSerializer


class TestList(TestCase):
    """Tests creation and validation of List objects using the model.

    Extends:
        TestCase (class): The django TestCase class.
        
    Methods:
        setUp() -> None
        test_001_list_with_proper_data() -> None
        test_002_list_with_default_data() -> None
        test_003_list_with_invalid_name() -> None
    """
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_001_list_with_proper_data(self) -> None:
        """Tests the creation of a new List with proper data."""
        new_list = List.objects.create(
            user=self.user,
            name="My List",
            completed=False
        )
        new_list.full_clean()
        self.assertIsNotNone(new_list)

    def test_002_list_with_default_data(self) -> None:
        new_list = List.objects.create(
            user=self.user,
            name="My List"
        )
        new_list.full_clean()
        self.assertIsNotNone(new_list)

    def test_003_list_with_invalid_name(self) -> None:
        try:
            new_list = List.objects.create(
                user=self.user,
                name="",
                completed=True
            )
            new_list.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "This field cannot be blank."
                in e.message_dict["name"]
            )


class TestTask(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        self.list = List.objects.create(
            user=self.user,
            name="My List",
            completed=False
        )

    def test_004_task_with_proper_data(self):
        new_task = Task.objects.create(
            list=self.list,
            name="My Task",
            completed=False
        )
        new_task.full_clean()
        self.assertIsNotNone(new_task)

    def test_005_task_with_default_values(self):
        new_task = Task.objects.create(
            list=self.list,
            name="My Task"
        )
        new_task.full_clean()
        self.assertIsNotNone(new_task)

    def test_006_task_with_invalid_name(self):
        try:
            new_task = Task.objects.create(
                list=self.list,
                name="",
                completed=True
            )
            new_task.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "This field cannot be blank."
                in e.message_dict["name"]
            )


class TestSerializers(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_007_list_serializer_with_proper_data(self):
        try:
            data = {
                "user": self.user.id,
                "name": "My List",
                "completed": True
            }
            ser_list = ListSerializer(data=data)
            self.assertTrue(ser_list.is_valid())
        except Exception as e:
            print(ser_list.errors)
            self.fail()

    def test_008_list_serializer_with_proper_response(self):
        try:
            data = {
                "user": self.user.id,
                "name": "My List",
                "completed": True
            }
            ser_list = ListSerializer(data=data)
            ser_list.is_valid()
            self.assertEqual(
                ser_list.data,
                {
                    "user": 5,
                    "name": "My List",
                    "completed": True
                }
            )
        except Exception as e:
            print(ser_list.errors)
            self.fail()

    def test_009_task_serializer_with_proper_data(self):
        data = {
            "user": self.user.id,
            "name": "My List",
            "completed": True
        }
        ser_list = ListSerializer(data=data)
        ser_list.is_valid()
        ser_list.save()
        try:
            data = {
                "list": ser_list.data['id'],
                "name": "My Task",
                "completed": True
            }
            ser_task = TaskSerializer(data=data)
            self.assertTrue(ser_task.is_valid())
        except Exception as e:
            print(ser_task.errors)
            self.fail()

    def test_010_task_serializer_with_proper_response(self):
        data = {
            "user": self.user.id,
            "name": "My List",
            "completed": True
        }
        ser_list = ListSerializer(data=data)
        ser_list.is_valid()
        ser_list.save()
        try:
            data = {
                "list": ser_list.data['id'],
                "name": "My Task",
                "completed": True
            }
            ser_task = TaskSerializer(data=data)
            ser_task.is_valid()
            self.assertEqual(
                ser_task.data,
                {
                    "list": ser_list.data['id'],
                    "name": "My Task",
                    "completed": True
                }
            )
        except Exception as e:
            print(ser_task.errors)
            self.fail()
