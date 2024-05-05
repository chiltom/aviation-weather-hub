"""Module that tests creation of Flight, Brief, and Hazard objects.

Classes:
    TestFlight
    TestBrief
    TestHazard
    TestSerializers
"""

from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
from flight_app.models import Flight, Brief, Hazard
from flight_app.serializers import FlightSerializer, BriefSerializer, HazardSerializer


class TestFlight(TestCase):
    """Tests creation and validation of Flight objects using the model.

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        setUp() -> None
        test_001_flight_with_proper_data() -> None
        test_002_flight_with_default_data() -> None
        test_003_flight_with_invalid_data() -> None
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

    def test_001_flight_with_proper_data(self) -> None:
        """Tests the creation of a new Flight with valid data."""
        new_flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time='2024-04-07T22:00:00Z',
            arrival_time='2024-04-08T01:00:00Z'
        )
        new_flight.full_clean()
        self.assertIsNotNone(new_flight)

    def test_002_flight_with_default_data(self) -> None:
        """Tests the creation of a new Flight with default data."""
        new_flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            arrival_time='2024-04-08T01:00:00Z'
        )
        new_flight.full_clean()
        self.assertIsNotNone(new_flight)

    def test_003_flight_with_invalid_data(self) -> None:
        """Tests the ValidationError raised when submitting invalid data for a new Flight."""
        try:
            new_flight = Flight.objects.create(
                user=self.user,
                tail_number=29,
                callsign="SHADY29",
                aircraft_type_model="ch47f",
                pilot_responsible="mr.goodman",
                origin="ksvn",
                destination="kchs",
                arrival_time='2024-04-08T01:00:00Z'
            )
            new_flight.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                'tail_number' in e.message_dict and 'aircraft_type_model' in e.message_dict
                and 'pilot_responsible' in e.message_dict and 'origin' in e.message_dict
            )


class TestBrief(TestCase):
    """Tests the creation of Brief objects using the model.

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        setUp() -> None
        test_004_brief_with_proper_data() -> None
        test_005_brief_with_invalid_data() -> None
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
        self.user.flights.set([Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            arrival_time='2024-04-08T01:00:00Z'
        )])

    def test_004_brief_with_proper_data(self) -> None:
        """Tests the creation of a new Brief with valid data."""
        new_brief = Brief.objects.create(
            flight=self.user.flights.get(id=1),
            surface_winds="VRB09KT",
            flight_level_winds="27009G15KT",
            visibility="1 1/4SM",
            sky_condition="BKN016 OVC038",
            temperature="M22",
            altimeter_setting="A3018",
            brief_time="2024-04-07T23:00:00Z",
            void_time="2024-04-08T01:00:00Z"
        )
        new_brief.full_clean()
        self.assertIsNotNone(new_brief)

    def test_005_brief_with_invalid_data(self) -> None:
        """Tests the ValidationError raised when submitting invalid data for a new Brief."""
        try:
            new_brief = Brief.objects.create(
                flight=self.user.flights.get(id=2),
                surface_winds="0009K",
                flight_level_winds="VRB0G15KT",
                visibility="1 1/4S",
                sky_condition="OVT038 BKN016",
                temperature="222",
                altimeter_setting="3018",
                brief_time="2024-04-07T23:00:00Z",
                void_time="2024-04-08T01:00:00Z"
            )
            new_brief.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                'surface_winds' in e.message_dict and 'flight_level_winds' in e.message_dict
                and 'visibility' in e.message_dict and 'altimeter_setting' in e.message_dict
                and 'sky_condition' in e.message_dict
            )


class TestHazard(TestCase):
    """Tests the creation of Hazard objects using the model.

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        setUp() -> None
        test_006_hazard_with_proper_data() -> None
        test_007_hazard_with_invalid_data() -> None
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
        self.user.flights.set([Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            arrival_time='2024-04-08T01:00:00Z'
        )])

    def test_006_hazard_with_proper_data(self) -> None:
        """Tests the creation of a new Hazard with valid data."""
        self.user.flights.get(id=6).briefs.set([Brief.objects.create(
            flight=self.user.flights.get(id=6),
            surface_winds="VRB09KT",
            flight_level_winds="27009G15KT",
            visibility="1 1/4SM",
            sky_condition="BKN016 OVC038",
            temperature="M22",
            altimeter_setting="A3018",
            brief_time="2024-04-07T23:00:00Z",
            void_time="2024-04-08T01:00:00Z"
        )])
        new_hazard = Hazard.objects.create(
            brief=self.user.flights.get(id=6).briefs.get(id=3),
            type="Thunderstorms",
            information="Big thunder"
        )
        new_hazard.full_clean()
        self.assertIsNotNone(new_hazard)

    def test_007_hazard_with_invalid_data(self) -> None:
        """Tests the ValidationError raised when submitting invalid data for a new Hazard."""
        self.user.flights.get(id=7).briefs.set([Brief.objects.create(
            flight=self.user.flights.get(id=7),
            surface_winds="VRB09KT",
            flight_level_winds="27009G15KT",
            visibility="1 1/4SM",
            sky_condition="BKN016 OVC038",
            temperature="M22",
            altimeter_setting="A3018",
            brief_time="2024-04-07T23:00:00Z",
            void_time="2024-04-08T01:00:00Z"
        )])
        try:
            new_hazard = Hazard.objects.create(
                brief=self.user.flights.get(id=7).briefs.get(id=4),
                type="thunderstorms",
                information="Big Thunder"
            )
            new_hazard.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue(
                'type' in e.message_dict
            )


class TestSerializers(TestCase):
    """Tests the creation of all Flight, Brief, and Hazard objects using Serializers.

    Extends:
        TestCase (class): The django TestCase class.

    Methods:
        test_008_flight_serializer_with_proper_data() -> None
        test_009_flight_serializer_with_proper_response() -> None
        test_010_brief_serializer_with_proper_data() -> None
        test_011_brief_serializer_with_proper_response() -> None
        test_012_hazard_serializer_with_proper_data() -> None
        test_013_hazard_serializer_with_proper_response() -> None
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

    def test_008_flight_serializer_with_proper_data(self) -> None:
        """Tests the creation of a new Flight with valid data through the Serializer."""
        try:
            data = {
                "user": self.user.id,
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Pilot Sucks",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-07T22:00:00Z",
                "arrival_time": '2024-04-08T01:00:00Z'
            }
            ser_flight = FlightSerializer(data=data)
            self.assertTrue(ser_flight.is_valid())
        except Exception:
            print(ser_flight.errors)
            self.fail()

    def test_009_flight_serializer_with_proper_response(self) -> None:
        """Tests the response data of a new Flight created with the Serializer."""
        try:
            data = {
                "user": self.user.id,
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Pilot Sucks",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-07T22:00:00Z",
                "arrival_time": '2024-04-08T01:00:00Z'
            }
            ser_flight = FlightSerializer(data=data)
            ser_flight.is_valid()
            self.assertEqual(
                ser_flight.data,
                {
                    "user": self.user.id,
                    "tail_number": 459,
                    "callsign": "SHADY29",
                    "aircraft_type_model": "CH-47F",
                    "pilot_responsible": "CW2 Pilot Sucks",
                    "origin": "KSVN",
                    "destination": "KCHS",
                    "flight_level": 3000,
                    "takeoff_time": "2024-04-07T22:00:00Z",
                    "arrival_time": "2024-04-08T01:00:00Z"
                }
            )
        except Exception:
            print(ser_flight.errors)
            self.fail()

    def test_010_brief_serializer_with_proper_data(self) -> None:
        """Tests the creation of a new Brief with valid data through the Serializer."""
        flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time="2024-04-07T22:00:00Z",
            arrival_time="2024-04-08T01:00:00Z"
        )
        try:
            data = {
                "flight": flight.id,
                "surface_winds": "VRB09KT",
                "flight_level_winds": "27009G15KT",
                "visibility": "1 1/4SM",
                "sky_condition": "BKN016 OVC038",
                "temperature": "M22",
                "altimeter_setting": "A3018",
                "brief_time": "2024-04-07T23:00:00Z",
                "void_time": "2024-04-08T01:00:00Z"
            }
            ser_brief = BriefSerializer(data=data)
            self.assertTrue(ser_brief.is_valid())
        except Exception:
            print(ser_brief.errors)

    def test_011_brief_serializer_with_proper_response(self) -> None:
        """Tests the response data from creating a new Brief with the Serializer."""
        flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time="2024-04-07T22:00:00Z",
            arrival_time="2024-04-08T01:00:00Z"
        )
        try:
            data = {
                "flight": flight.id,
                "surface_winds": "VRB09KT",
                "flight_level_winds": "27009G15KT",
                "visibility": "1 1/4SM",
                "sky_condition": "BKN016 OVC038",
                "temperature": "M22",
                "altimeter_setting": "A3018",
                "brief_time": "2024-04-07T23:00:00Z",
                "void_time": "2024-04-08T01:00:00Z"
            }
            ser_brief = BriefSerializer(data=data)
            ser_brief.is_valid()
            self.assertEqual(
                ser_brief.data,
                {
                    "flight": flight.id,
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "M22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z"
                }
            )
        except Exception:
            print(ser_brief.errors)
            self.fail()

    def test_012_hazard_serializer_with_proper_data(self) -> None:
        """Tests the creation of a new Hazard with valid data through the Serializer."""
        flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time="2024-04-07T22:00:00Z",
            arrival_time="2024-04-08T01:00:00Z"
        )
        brief = Brief.objects.create(
            flight=flight,
            surface_winds="VRB09KT",
            flight_level_winds="27009G15KT",
            visibility="1 1/4SM",
            sky_condition="BKN016 OVC038",
            temperature="M22",
            altimeter_setting="A3018",
            brief_time="2024-04-07T23:00:00Z",
            void_time="2024-04-08T01:00:00Z"
        )
        try:
            data = {
                "brief": brief.id,
                "type": "Thunderstorm",
                "information": "Big Thunder"
            }
            ser_hazard = HazardSerializer(data=data)
            self.assertTrue(ser_hazard.is_valid())
        except Exception:
            print(ser_hazard.errors)
            self.fail()

    def test_013_hazard_serializer_with_proper_response(self) -> None:
        """Tests the response data from creation a new Hazard with the Serializer."""
        flight = Flight.objects.create(
            user=self.user,
            tail_number=459,
            callsign="SHADY29",
            aircraft_type_model="CH-47F",
            pilot_responsible="CW2 Pilot Sucks",
            origin="KSVN",
            destination="KCHS",
            flight_level=3000,
            takeoff_time="2024-04-07T22:00:00Z",
            arrival_time="2024-04-08T01:00:00Z"
        )
        brief = Brief.objects.create(
            flight=flight,
            surface_winds="VRB09KT",
            flight_level_winds="27009G15KT",
            visibility="1 1/4SM",
            sky_condition="BKN016 OVC038",
            temperature="M22",
            altimeter_setting="A3018",
            brief_time="2024-04-07T23:00:00Z",
            void_time="2024-04-08T01:00:00Z"
        )
        try:
            data = {
                "brief": brief.id,
                "type": "Thunderstorm",
                "information": "Big Thunder"
            }
            ser_hazard = HazardSerializer(data=data)
            ser_hazard.is_valid()
            self.assertEqual(
                ser_hazard.data,
                {
                    "brief": brief.id,
                    "type": "Thunderstorm",
                    "information": "Big Thunder"
                }
            )
        except Exception:
            print(ser_hazard.errors)
            self.fail()
