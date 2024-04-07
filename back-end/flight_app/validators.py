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
