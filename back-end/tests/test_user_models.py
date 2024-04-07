from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from user_app.models import User


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
                'duplicate key value violates unique constraint "user_app_user_username_key"' in str(
                    e)
            )
