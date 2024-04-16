from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from decimal import Decimal
from user_app.models import User
from named_locations_app.models import Named_location
from named_locations_app.serializers import Named_locationSerializer


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

    def test_001_named_location_with_proper_data(self):
        new_named_location = Named_location.objects.create(
            user=self.user,
            city="Savannah",
            longitude=Decimal('-81.0883'),
            country="US",
            latitude=Decimal('32.0761')
        )
        new_named_location.full_clean()
        self.assertIsNotNone(new_named_location)

    def test_002_named_location_with_invalid_data(self):
        try:
            new_named_location = Named_location.objects.create(
                user=self.user,
                city="savannah",
                longitude=-81.0883,
                country="us",
                latitude=Decimal('32.0761')
            )
            new_named_location.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                "city" in e.message_dict and "country" in e.message_dict and "longitude" in e.message_dict
            )

    def test_003_named_location_violating_unique_field_constraints(self):
        try:
            first_named_location = Named_location.objects.create(
                user=self.user,
                city="Savannah",
                longitude=Decimal('-81.0883'),
                country="GA",
                latitude=Decimal('32.0761')
            )
            first_named_location.full_clean()
            first_named_location.save()
            second_named_location = Named_location.objects.create(
                user=self.user,
                city="Pooler",
                country="GA",
                longitude=Decimal('-81.0883'),
                latitude=Decimal('32.0761')
            )
            second_named_location.full_clean()
            self.fail()
        except IntegrityError as e:
            self.assertIn(
                'duplicate key value violates unique constraint "unique coordinates per user"',
                str(e)
            )


class Test_named_location_serializer(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_004_named_location_serializer_with_proper_data(self):
        data = {
            "user": self.user.id,
            "city": "Savannah",
            "country": "GA",
            "latitude": Decimal('32.0761'),
            "longitude": Decimal('-81.0883')
        }
        try:
            ser_named_location = Named_locationSerializer(data=data)
            self.assertTrue(ser_named_location.is_valid())
        except Exception as e:
            print(ser_named_location.errors)
            self.fail()

    def test_005_named_location_serializer_with_proper_response(self):
        data = {
            "user": self.user.id,
            "city": "Savannah",
            "country": "GA",
            "latitude": Decimal('32.0761'),
            "longitude": Decimal('-81.0883')
        }
        try:
            ser_named_location = Named_locationSerializer(data=data)
            ser_named_location.is_valid()
            self.assertEqual(
                ser_named_location.data,
                {
                    "user": self.user.id,
                    "city": "Savannah",
                    "country": "GA",
                    "latitude": '32.0761',
                    "longitude": '-81.0883'
                }
            )
        except Exception as e:
            print(ser_named_location.errors)
            self.fail()
