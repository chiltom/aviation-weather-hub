from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from location_app.models import Airport

# Test airport creation


class Test_airport(TestCase):

    def test_001_airport_with_proper_data(self):
        user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )
        new_airport = Airport.objects.create(
            user=user,
            name="Savannah",
            icao_code="KSVN"
        )
        new_airport.full_clean()
        self.assertIsNotNone(new_airport)

    def test_002_airport_with_invalid_data(self):
        try:
            user = User.objects.create_user(
                username="tom@tom.com",
                password="thomas",
                email="tom@tom.com",
                display_name="chiltom",
                first_name="Tom",
                last_name="Childress"
            )
            new_airport = Airport.objects.create(
                user=user,
                name="savannah",
                icao_code="ksvn"
            )
            new_airport.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "icao_code" in e.message_dict and "name" in e.message_dict
            )
