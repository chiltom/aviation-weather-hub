"""Module that tests creation of Airport objects.

Classes:
    TestAirport
    TestAirportSerializer
"""

from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from airport_app.models import Airport
from airport_app.serializers import AirportSerializer


class TestAirport(TestCase):
    """Tests the creation of Airport objects using the model.

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        setUp() -> None
        test_001_airport_with_proper_data() -> None
        test_002_airport_with_invalid_data() -> None
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

    def test_001_airport_with_proper_data(self) -> None:
        """Tests the creation of a new Airport with valid data."""
        new_airport = Airport.objects.create(
            user=self.user,
            name="Savannah",
            icao_code="KSVN"
        )
        new_airport.full_clean()
        self.assertIsNotNone(new_airport)

    def test_002_airport_with_invalid_data(self) -> None:
        """Tests the ValidationError raised when submitting invalid data for an Airport."""
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


class TestAirportSerializer(TestCase):
    """Tests the creation of Airport objects using the AirportSerializer

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        setUp() -> None
        test_003_airport_serializer_with_proper_data() -> None
        test_004_airport_serializer_with_proper_response() -> None
    """

    def setUp(self) -> None:
        self.user = User.objects.create(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_003_airport_serializer_with_proper_data(self):
        """Tests the creation of a new Airport with valid data through the Serializer."""
        try:
            data = {
                "user": self.user.id,
                "name": "Savannah, GA",
                "icao_code": "KSVN"
            }
            ser_airport = AirportSerializer(data=data)
            self.assertTrue(ser_airport.is_valid())
        except Exception:
            print(ser_airport.errors)
            self.fail()

    def test_004_airport_serializer_with_proper_response(self):
        """Tests the creation of a new Airport and the proper data response."""
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
        except Exception:
            print(ser_airport.errors)
            self.fail()
