from django.test import TestCase
from django.core.exceptions import ValidationError
from decimal import Decimal
from user_app.models import User
from airport_app.models import Airport
from airport_app.serializers import AirportSerializer

# Test airport creation


class Test_airport(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_001_airport_with_proper_data(self):
        new_airport = Airport.objects.create(
            user=self.user,
            name="Savannah",
            icao_code="KSVN"
        )
        new_airport.full_clean()
        self.assertIsNotNone(new_airport)

    def test_002_airport_with_invalid_data(self):
        try:
            new_airport = Airport.objects.create(
                user=self.user,
                name="savannah",
                icao_code="ksvn"
            )
            new_airport.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "icao_code" in e.message_dict and "name" in e.message_dict
            )


class Test_airport_serializer(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_005_airport_serializer_with_proper_data(self):
        try:
            data = {
                "user": self.user.id,
                "name": "Savannah, GA",
                "icao_code": "KSVN"
            }
            ser_airport = AirportSerializer(data=data)
            self.assertTrue(ser_airport.is_valid())
        except Exception as e:
            print(ser_airport.errors)
            self.fail()

    def test_006_airport_serializer_with_proper_response(self):
        try:
            data = {
                "user": self.user.id,
                "name": "Savannah, GA",
                "icao_code": "KSVN"
            }
            ser_airport = AirportSerializer(data=data)
            ser_airport.is_valid()
            self.assertEqual(
                ser_airport.data,
                {
                    "user": self.user.id,
                    "name": "Savannah, GA",
                    "icao_code": "KSVN"
                }
            )
        except Exception as e:
            print(ser_airport.errors)
            self.fail()
