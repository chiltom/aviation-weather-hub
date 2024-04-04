from django.test import TestCase
from user_app.models import User
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
