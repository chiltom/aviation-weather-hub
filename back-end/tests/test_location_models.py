from django.test import TestCase
from django.core.exceptions import ValidationError
from decimal import Decimal
from user_app.models import User
from location_app.models import Airport, Named_location
from location_app.serializers import AirportSerializer, Named_locationSerializer

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


class Test_named_location(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_003_named_location_with_proper_date(self):
        new_named_location = Named_location.objects.create(
            user=self.user,
            city="Savannah",
            longitude=Decimal('-81.088371'),
            state="GA",
            latitude=Decimal('32.076176')
        )
        new_named_location.full_clean()
        self.assertIsNotNone(new_named_location)

    def test_004_named_location_with_invalid_data(self):
        try:
            new_named_location = Named_location.objects.create(
                user=self.user,
                city="savannah",
                longitude=-81.088371,
                state="ga",
                latitude=Decimal('32.076176')
            )
            new_named_location.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "city" in e.message_dict and "state" in e.message_dict and "longitude" in e.message_dict
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
    
    def test_007_named_location_serializer_with_proper_data(self):
        data = {
            "user": self.user.id,
            "city": "Savannah",
            "state": "GA",
            "latitude": Decimal('32.076176'),
            "longitude": Decimal('-81.088371')
        }
        try:
            ser_named_location = Named_locationSerializer(data=data)
            self.assertTrue(ser_named_location.is_valid())
        except Exception as e:
            print(ser_named_location.errors)
            self.fail()
    
    def test_008_named_location_serializer_with_proper_response(self):
        data = {
            "user": self.user.id,
            "city": "Savannah",
            "state": "GA",
            "latitude": Decimal('32.076176'),
            "longitude": Decimal('-81.088371')
        }
        try:
            ser_named_location = Named_locationSerializer(data=data)
            ser_named_location.is_valid()
            self.assertEqual(
                ser_named_location.data,
                {
                    "user": self.user.id,
                    "city": "Savannah",
                    "state": "GA",
                    "latitude": '32.076176',
                    "longitude": '-81.088371'
                }
            )
        except Exception as e:
            print(ser_named_location.errors)
            self.fail()