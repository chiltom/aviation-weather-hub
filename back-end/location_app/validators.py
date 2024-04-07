from django.core.exceptions import ValidationError
import re


def validate_icao_code(icao_code: str) -> str:
    error_message = f'''
        {icao_code} is not a valid ICAO code. It should consist of only 4 capitalized characters.'''
    regex = r'^[A-Z]+$'
    good_name = re.match(regex, icao_code)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'icao_code': icao_code})


def validate_airport_name(airport_name: str) -> str:
    error_message = f'{airport_name} must be Title case.'
    regex = r'^[A-Z][a-z]+$'
    good_name = re.match(regex, airport_name)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'airport_name': airport_name})


def validate_city_name(city_name: str) -> str:
    error_message = f'{city_name} must be Title case.'
    regex = r'^[A-Z][a-z]+$'
    good_name = re.match(regex, city_name)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={"city_name": city_name})


def validate_state_abbreviation(state_abbreviation: str) -> str:
    error_message = f'''{
        state_abbreviation} must consist of only 2 capital letters.'''
    regex = r'^[A-Z]{2}$'
    good_name = re.match(regex, state_abbreviation)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={
                          "state_abbreviation": state_abbreviation})
