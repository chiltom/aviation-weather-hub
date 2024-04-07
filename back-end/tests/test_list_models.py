from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from list_app.models import List, Task
from list_app.serializers import ListSerializer, TaskSerializer


# Test list creation
class Test_list(TestCase):
    
    def test_005_list_with_proper_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_list = List.objects.create(
            user=user,
            name="My List",
            completed=False
        )
        new_list.full_clean()
        self.assertIsNotNone(new_list)
    
    def test_006_list_with_default_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_list = List.objects.create(
            user=user,
            name="My List"
        )
        new_list.full_clean()
        self.assertIsNotNone(new_list)
    
    def test_007_list_with_invalid_name(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        try:
            new_list = List.objects.create(
                user=user,
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
    
class Test_task(TestCase):
    
    def test_008_task_with_proper_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_list = List.objects.create(
            user=user,
            name="My List",
            completed=False
        )
        new_list.full_clean()
        new_list.save()
        new_task = Task.objects.create(
            list=new_list,
            name="My Task",
            completed=False
        )
        new_task.full_clean()
        self.assertIsNotNone(new_task)
    
    def test_009_task_with_default_values(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_list = List.objects.create(
            user=user,
            name="My List",
            completed=False
        )
        new_list.full_clean()
        new_list.save()
        new_task = Task.objects.create(
            list=new_list,
            name="My Task"
        )
        new_task.full_clean()
        self.assertIsNotNone(new_task)
    
    def test_010_task_with_invalid_name(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_list = List.objects.create(
            user=user,
            name="My List",
            completed=False
        )
        new_list.full_clean()
        new_list.save()
        try:
            new_task = Task.objects.create(
                list=new_list,
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

class Test_list_serializer(TestCase):
    def test_011_list_serializer_with_proper_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        try:
            data = {
                "user": 4,
                "name": "My List",
                "completed": True
            }
            ser_list = ListSerializer(data=data)
            self.assertTrue(ser_list.is_valid())
        except Exception as e:
            print(ser_list.errors)
            self.fail()
    
    def test_012_list_serializer_with_proper_response(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        try:
            data = {
                "user": 5,
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
    
    def test_013_task_serializer_with_proper_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        data = {
                "user": 6,
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
        
    
    def test_014_task_serializer_with_proper_response(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        data = {
                "user": 7,
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