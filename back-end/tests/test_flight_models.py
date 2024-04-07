from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from flight_app.models import Flight


# Test flight creation
class Test_flight(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tom@tom.com",
            password="thomas",
            email="tom@tom.com",
            display_name="chiltom",
            first_name="Tom",
            last_name="Childress"
        )

    def test_001_flight_with_proper_data(self):
        new_flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time='2024-04-07 22:00:00+00:00',
            arrival_time='2024-04-08 01:00:00+00:00',
            brief_time='2024-04-07 21:00:00+00:00',
            void_time='2024-04-07 22:30:00+00:00'
        )
        new_flight.full_clean()
        self.assertIsNotNone(new_flight)

    def test_002_flight_with_default_data(self):
        new_flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            arrival_time='2024-04-08 01:00:00+00:00',
            brief_time='2024-04-07 21:00:00+00:00',
            void_time='2024-04-07 22:30:00+00:00'
        )
        new_flight.full_clean()
        self.assertIsNotNone(new_flight)

    def test_003_flight_with_invalid_data(self):
        try:
            new_flight = Flight.objects.create(
                user=self.user,
                tail_number=29,
                aircraft_type_model="ch47f",
                pilot_responsible="mr.goodman",
                origin="ksvn",
                destination="kchs",
                arrival_time='2024-04-08 01:00:00+00:00',
                brief_time='2024-04-07 21:00:00+00:00',
                void_time='2024-04-07 22:30:00+00:00'
            )
            new_flight.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                'tail_number' in e.message_dict and 'aircraft_type_model' in e.message_dict
                and 'pilot_responsible' in e.message_dict and 'origin' in e.message_dict
            )
