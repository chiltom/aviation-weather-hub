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
    error_message = f'''{
        airport_name} must be Title case and only contain spaces, commas, and periods.'''
    regex = r'^[A-Z][a-zA-Z\,\. ]+$'
    good_name = re.match(regex, airport_name)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'airport_name': airport_name})
