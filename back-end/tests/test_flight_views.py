"""Module that tests Flight, Brief, and Hazard views.

Classes:
    Test1FlightCrud
    Test2BriefCrud
    Test3HazardCrud
"""

import json
from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase


class Test1FlightCrud(APITestCase):
    """Tests the CRUD capabilities of the Flight views.

    Extends:
        APITestCase (class): The rest_framework APITestCase class.

    Methods:
        setUp() -> None
        test_000_all_flights_with_invalid_airport_code() -> None
        test_001_all_flights_post() -> None
        test_002_all_flights_get() -> None
        test_003_a_flight_get() -> None
        test_004_a_flight_put() -> None
        test_005_a_flight_delete() -> None
    """

    def setUp(self) -> None:
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Charleston",
                "icao_code": "KCHS"
            }),
            content_type="application/json"
        )

    def test_000_all_flights_post_with_invalid_airport_code(self) -> None:
        """Tests the error returned when the ICAO code is not present in the User's Airports."""
        answer = json.dumps({
            "Error": "Destination code not found in your stored airport codes."
        })
        response = self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "aircraft_type_model": "CH-47F",
                "callsign": "SHADY29",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "EVGA",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.content), answer)

    def test_001_all_flights_post(self) -> None:
        """Tests the post request method for the AllFlights view."""
        answer = {
            "id": 1,
            "user": 2,
            "tail_number": 459,
            "callsign": "SHADY29",
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "KCHS",
            "flight_level": 3000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }
        response = self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    def test_002_all_flights_get(self) -> None:
        """Tests the get request method for the AllFlights view."""
        answer = [{
            "id": 2,
            "user": 3,
            "tail_number": 459,
            "callsign": "SHADY29",
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "KCHS",
            "flight_level": 3000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }]
        self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_flights"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_003_a_flight_get(self) -> None:
        """Tests the get request for the AFlight view."""
        answer = {
            "id": 3,
            "user": 4,
            "tail_number": 459,
            "callsign": "SHADY29",
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "KCHS",
            "flight_level": 3000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }
        self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_flight", args=[3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_004_a_flight_put(self) -> None:
        """Tests the put request method for the AFlight view."""
        answer = {
            "id": 4,
            "user": 5,
            "tail_number": 459,
            "callsign": "SHADY29",
            "aircraft_type_model": "CH-47F",
            "pilot_responsible": "CW2 Chump Nerd",
            "origin": "KSVN",
            "destination": "EVGA",
            "flight_level": 4000,
            "takeoff_time": "2024-04-08T10:00:00Z",
            "arrival_time": "2024-04-08T13:00:00Z",
            "briefs": []
        }
        self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_flight", args=[4]),
            data=json.dumps({
                "destination": "EVGA",
                "flight_level": 4000
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_005_a_flight_delete(self) -> None:
        """Tests the delete request method for the AFlight view."""
        self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_flight", args=[5]))
        self.assertEqual(response.status_code, 204)


class Test2BriefCrud(APITestCase):
    """Tests the CRUD capabilities of the Brief views.

    Extends:
        APITestCase (class): The rest_framework APITestCase class.

    Methods:
        setUp() -> None
        test_006_all_briefs_post() -> None
        test_007_all_briefs_get() -> None
        test_008_a_brief_get() -> None
        test_009_a_brief_put() -> None
        test_010_a_brief_delete() -> None
    """

    def setUp(self) -> None:
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Charleston",
                "icao_code": "KCHS"
            }),
            content_type="application/json"
        )
        self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )

    def test_006_all_briefs_post(self) -> None:
        """Tests the post request method for the AllBriefs view."""
        answer = {
            "id": 1,
            "flight": 6,
            "surface_winds": "VRB09KT",
            "flight_level_winds": "27009G15KT",
            "visibility": "1 1/4SM",
            "sky_condition": "BKN016 OVC038",
            "temperature": "22",
            "altimeter_setting": "A3018",
            "brief_time": "2024-04-07T23:00:00Z",
            "void_time": "2024-04-08T01:00:00Z",
            "hazards": []
        }
        response = self.client.post(
            reverse("all_briefs", args=[6]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    def test_007_all_briefs_get(self) -> None:
        """Tests the get request method for the AllBriefs view."""
        answer = [{
            "id": 2,
            "flight": 7,
            "surface_winds": "VRB09KT",
            "flight_level_winds": "27009G15KT",
            "visibility": "1 1/4SM",
            "sky_condition": "BKN016 OVC038",
            "temperature": "22",
            "altimeter_setting": "A3018",
            "brief_time": "2024-04-07T23:00:00Z",
            "void_time": "2024-04-08T01:00:00Z",
            "hazards": []
        }]
        self.client.post(
            reverse("all_briefs", args=[7]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_briefs", args=[7]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_008_a_brief_get(self) -> None:
        """Tests the get request method for the ABrief view."""
        answer = {
            "id": 3,
            "flight": 8,
            "surface_winds": "VRB09KT",
            "flight_level_winds": "27009G15KT",
            "visibility": "1 1/4SM",
            "sky_condition": "BKN016 OVC038",
            "temperature": "22",
            "altimeter_setting": "A3018",
            "brief_time": "2024-04-07T23:00:00Z",
            "void_time": "2024-04-08T01:00:00Z",
            "hazards": []
        }
        self.client.post(
            reverse("all_briefs", args=[8]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_brief", args=[8, 3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_009_a_brief_put(self) -> None:
        """Tests the put request method on the ABrief view."""
        answer = {
            "id": 4,
            "flight": 9,
            "surface_winds": "VRB09KT",
            "flight_level_winds": "27009G15KT",
            "visibility": "1 1/4SM",
            "sky_condition": "CLR",
            "temperature": "20",
            "altimeter_setting": "A3018",
            "brief_time": "2024-04-07T23:00:00Z",
            "void_time": "2024-04-08T01:00:00Z",
            "hazards": []
        }
        self.client.post(
            reverse("all_briefs", args=[9]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_brief", args=[9, 4]),
            data=json.dumps({
                "sky_condition": "CLR",
                "temperature": "20"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_010_a_brief_delete(self) -> None:
        """Tests the delete request method on the ABrief view."""
        self.client.post(
            reverse("all_briefs", args=[10]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_brief", args=[10, 5]))
        self.assertEqual(response.status_code, 204)


class Test3HazardCrud(APITestCase):
    """Tests the CRUD capabilities of the Hazard views.

    Extends:
        APITestCase (class): The rest_framework APITestCase class.

    Methods:
        setUp() -> None
        test_011_all_hazards_post() -> None
        test_012_all_hazards_get() -> None
        test_013_a_hazard_get() -> None
        test_014_a_hazard_put() -> None
        test_015_a_hazard_delete() -> None
    """

    def setUp(self) -> None:
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Charleston",
                "icao_code": "KCHS"
            }),
            content_type="application/json"
        )
        flight_post_response = self.client.post(
            reverse("all_flights"),
            data=json.dumps({
                "tail_number": 459,
                "callsign": "SHADY29",
                "aircraft_type_model": "CH-47F",
                "pilot_responsible": "CW2 Chump Nerd",
                "origin": "KSVN",
                "destination": "KCHS",
                "flight_level": 3000,
                "takeoff_time": "2024-04-08T10:00:00Z",
                "arrival_time": "2024-04-08T13:00:00Z"
            }),
            content_type="application/json"
        )
        self.client.post(
            reverse("all_briefs", args=[json.loads(
                flight_post_response.content)['id']]),
            data=json.dumps(
                {
                    "surface_winds": "VRB09KT",
                    "flight_level_winds": "27009G15KT",
                    "visibility": "1 1/4SM",
                    "sky_condition": "BKN016 OVC038",
                    "temperature": "22",
                    "altimeter_setting": "A3018",
                    "brief_time": "2024-04-07T23:00:00Z",
                    "void_time": "2024-04-08T01:00:00Z",
                }
            ),
            content_type="application/json"
        )

    def test_011_all_hazards_post(self) -> None:
        """Tests the post request method on the AllHazards view."""
        answer = {
            "id": 1,
            "brief": 6,
            "type": "Thunderstorms",
            "information": "Big Thunder stuff"
        }
        response = self.client.post(
            reverse("all_hazards", args=[11, 6]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content), answer)

    def test_012_all_hazards_get(self) -> None:
        """Tests the get request method for the AllHazards view."""
        answer = [{
            "id": 2,
            "brief": 7,
            "type": "Thunderstorms",
            "information": "Big Thunder stuff"
        }]
        self.client.post(
            reverse("all_hazards", args=[12, 7]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        response = self.client.get(reverse("all_hazards", args=[12, 7]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_013_a_hazard_get(self) -> None:
        """Tests the get request method on the AHazard view."""
        answer = {
            "id": 3,
            "brief": 8,
            "type": "Thunderstorms",
            "information": "Big Thunder stuff"
        }
        self.client.post(
            reverse("all_hazards", args=[13, 8]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        response = self.client.get(reverse("a_hazard", args=[13, 8, 3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_014_a_hazard_put(self) -> None:
        """Tests the put request method on the AHazard view."""
        answer = {
            "id": 4,
            "brief": 9,
            "type": "Freezing Rain",
            "information": "The rain is freezing?!?!"
        }
        self.client.post(
            reverse("all_hazards", args=[14, 9]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        response = self.client.put(
            reverse("a_hazard", args=[14, 9, 4]),
            data=json.dumps({
                "type": "Freezing Rain",
                "information": "The rain is freezing?!?!"
            }),
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_015_a_hazard_delete(self) -> None:
        """Tests the delete request method on the AHazard view."""
        self.client.post(
            reverse("all_hazards", args=[15, 10]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_hazard", args=[15, 10, 5]))
        self.assertEqual(response.status_code, 204)
