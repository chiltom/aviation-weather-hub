from django.test import TestCase
from django.shortcuts import get_list_or_404, get_object_or_404
from user_app.models import User
from list_app.models import List, Task
from django.core.exceptions import ValidationError
from django.db import IntegrityError, DataError

# Test user creation
class Test_user(TestCase):
    def test_001_user_with_proper_data(self):
        new_user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_user.full_clean()
        self.assertIsNotNone(new_user)

    def test_002_user_with_improper_email(self):
        try:
            new_user = User.objects.create_user(
                username="tom",
                password="thomas",
                email="tom",
                display_name="chiltom",
                first_name="Tom",
                last_name="Childress"
            )
            new_user.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue("email" in e.message_dict)

    def test_003_user_with_improper_names(self):
        try:
            new_user = User.objects.create_user(
                username="tom@tom.com",
                password="thomas",
                email="tom",
                display_name="!chiltom",
                first_name="tom",
                last_name="childress",
            )
            new_user.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "display_name" in e.message_dict and "first_name" in e.message_dict and "last_name" in e.message_dict)
    
    def test_004_user_with_repeated_email(self):
        try:
            new_user = User.objects.create_user(
                username="tom@tom.com",
                password="thomas",
                email="tom@tom.com",
                display_name="chiltom",
                first_name="Tom",
                last_name="Childress",
            )
            new_user.full_clean()
            new_user.save()
            new_user_two = User.objects.create_user(
                username="tom@tom.com",
                password="odie",
                email="tom@tom.com",
                display_name="odiesturn",
                first_name="Odie",
                last_name="Childress",
            )
            new_user_two.full_clean()
            self.fail()
        except IntegrityError as e:
            self.assertTrue(
                'duplicate key value violates unique constraint "user_app_user_username_key"' in str(e)
            )

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