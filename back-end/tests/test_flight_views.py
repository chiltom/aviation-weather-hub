from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json


# Test flight CRUD capabilities

class Test_flight_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        airport_one_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        airport_two_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Charleston",
                "icao_code": "KCHS"
            }),
            content_type="application/json"
        )

    # Test post method with invalid destination
    def test_000_all_flights_post_with_invalid_airport_code(self):
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

    # Test post method on all_flights view

    def test_001_all_flights_post(self):
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

    # Test get method on all_flights view

    def test_002_all_flights_get(self):
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
        response = self.client.get(reverse("all_flights"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_003_a_flight_get(self):
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
        response = self.client.get(reverse("a_flight", args=[3]))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), answer)

    def test_004_a_flight_put(self):
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

    # Test delete method on a_flight view

    def test_005_a_flight_delete(self):
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
        response = self.client.delete(reverse("a_flight", args=[5]))
        self.assertEqual(response.status_code, 204)


# Test brief CRUD functionality
# g included in name to trick django to test in order, fix later
class Test_g_brief_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        airport_one_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        airport_two_post_response = self.client.post(
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

    # Test post method on all briefs view
    def test_006_all_briefs_post(self):
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

    # Test get method on all briefs view
    def test_007_all_briefs_get(self):
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
        brief_post_response = self.client.post(
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

    # Test get method on a brief view
    def test_008_a_brief_get(self):
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
        brief_post_response = self.client.post(
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

    # Test put method on a brief view
    def test_009_a_brief_put(self):
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
        brief_post_response = self.client.post(
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

    # Test delete method on a_brief view
    def test_010_a_brief_delete(self):
        brief_post_response = self.client.post(
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


# Test hazard CRUD functionality, h included to ensure order of tests
class Test_h_hazard_crud(APITestCase):
    def setUp(self):
        client = Client()
        sign_up_response = client.post(
            reverse("signup"),
            data={"email": "odie@odie.com", "password": "odie", "display_name": "odiesturn",
                  "first_name": "Odie", "last_name": "Childress"},
            content_type="application/json"
        )
        response_body = json.loads(sign_up_response.content)
        self.client.cookies = sign_up_response.client.cookies
        airport_one_post_response = self.client.post(
            reverse("all_airports"),
            data=json.dumps({
                "name": "Savannah",
                "icao_code": "KSVN"
            }),
            content_type="application/json"
        )
        airport_two_post_response = self.client.post(
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
        brief_post_response = self.client.post(
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

    # Test post method on all hazards view
    def test_011_all_hazards_post(self):
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

    # Test get method on all_hazards view
    def test_012_all_hazards_get(self):
        answer = [{
            "id": 2,
            "brief": 7,
            "type": "Thunderstorms",
            "information": "Big Thunder stuff"
        }]
        hazard_post_response = self.client.post(
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

    # Test get method on a_hazard view
    def test_013_a_hazard_get(self):
        answer = {
            "id": 3,
            "brief": 8,
            "type": "Thunderstorms",
            "information": "Big Thunder stuff"
        }
        hazard_post_response = self.client.post(
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

    # Test put method on a_hazard view
    def test_014_a_hazard_put(self):
        answer = {
            "id": 4,
            "brief": 9,
            "type": "Freezing Rain",
            "information": "The rain is freezing?!?!"
        }
        hazard_post_response = self.client.post(
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

    # Test delete method on a_hazard view
    def test_015_a_hazard_delete(self):
        hazard_post_response = self.client.post(
            reverse("all_hazards", args=[15, 10]),
            data=json.dumps({
                "type": "Thunderstorms",
                "information": "Big Thunder stuff"
            }),
            content_type="application/json"
        )
        response = self.client.delete(reverse("a_hazard", args=[15, 10, 5]))
        self.assertEqual(response.status_code, 204)
