from django.core.exceptions import ValidationError
import re


def validate_aircraft_type_model(aircraft_type_model: str) -> str:
    error_message = f'''
        {aircraft_type_model} is not a valid aircraft model. It should consist only of
        uppercase letters, a hyphen, and digits.'''
    regex = r'^[A-Z0-9\-]+$'
    good_name = re.match(regex, aircraft_type_model)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={
                          'aircraft_type_model': aircraft_type_model})


def validate_pilot_responsible(pilot_responsible: str) -> str:
    error_message = f'{pilot_responsible} must be in Title Case.'
    regex = r'^[A-Z][A-Za-z0-9\- ]+$'
    good_name = re.match(regex, pilot_responsible)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={
                          'pilot_responsible': pilot_responsible})


def validate_origin(origin: str) -> str:
    # take in origin code
    # grab all instances of airports from Airport model and store all codes as list
    # iterate over list and if origin input matches airport code, return
    # else raise ValidationError that code is not in existing airport storage
    error_message = f'{origin} must be a valid airport code.'
    regex = r'^[A-Z]+$'
    good_name = re.match(regex, origin)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'origin': origin})


def validate_destination(destination: str) -> str:
    error_message = f'{destination} must be a valid airport code.'
    regex = r'^[A-Z]+$'
    good_name = re.match(regex, destination)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'destination': destination})


def validate_surface_winds(surface_winds: str) -> str:
    error_message = f'''
        {surface_winds} must be in the correct METAR and TAF format.'''
    gust_regex = r'^[\w]{5}G[\d]{2}KT$'
    no_gust_regex = r'^[\w]{5}KT$'
    good_gust_name = re.match(gust_regex, surface_winds)
    good_no_gust_name = re.match(no_gust_regex, surface_winds)
    if good_gust_name or good_no_gust_name:
        return surface_winds
    raise ValidationError(error_message, params={
                          'surface_winds': surface_winds})


def validate_flight_level_winds(flight_level_winds: str) -> str:
    error_message = f'''
        {flight_level_winds} must be in the correct METAR and TAF format.'''
    gust_regex = r'^[VRB0-9]{5}G[\d]{2}KT$'
    no_gust_regex = r'^[VRB0-9]{5}KT$'
    good_gust_name = re.match(gust_regex, flight_level_winds)
    good_no_gust_name = re.match(no_gust_regex, flight_level_winds)
    if good_gust_name or good_no_gust_name:
        return flight_level_winds
    raise ValidationError(error_message, params={
                          'surface_winds': flight_level_winds})


def validate_visibility(visibility: str) -> str:
    error_message = f'''
        {visibility} must be a valid visibility format.'''
    regex = r'^[P|M]*[0-9 \/]+SM$'
    good_name = re.match(regex, visibility)
    if good_name:
        return visibility
    raise ValidationError(error_message, params={'visibility': visibility})


def validate_sky_condition(sky_condition: str) -> str:
    error_message = f'''
        {sky_condition} must be a valid sky condition.'''
    regex = r'^((OVC|BKN|VV|SCT|SKT|CLR|SKC|FEW)\d{0,3} *)+$'
    good_name = re.match(regex, sky_condition)
    if good_name:
        return sky_condition
    raise ValidationError(error_message, params={
                          "sky_condition": sky_condition})


def validate_altimeter_setting(altimeter_setting: str) -> str:
    error_message = f'''
        {altimeter_setting} must be a valid altimeter setting.'''
    regex = r'^A[0-9]{4}$'
    good_name = re.match(regex, altimeter_setting)
    if good_name:
        return altimeter_setting
    raise ValidationError(error_message, params={
                          "altimeter_setting": altimeter_setting})


def validate_temperature(temperature: str) -> str:
    error_message = f'''
        {temperature} is not a valid temperature string.'''
    regex = r'^(M*)[0-9]+$'
    good_name = re.match(regex, temperature)
    if good_name:
        return temperature
    raise ValidationError(error_message, params={"temperature": temperature})


def validate_hazard_type(hazard_type: str) -> str:
    error_message = f'''
        {hazard_type} must be in Title case.'''
    regex = r'^([A-Z][\w ]+)+$'
    good_name = re.match(regex, hazard_type)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={"hazard_type": hazard_type})
