from django.core.exceptions import ValidationError
import re


def validate_display_name(display_name: str) -> str:
    error_message = f'''
        {display_name} is not a valid username. Usernames should only contain letters, numbers, or the following special characters: .-_'''
    regex = r'^[A-Za-z\.\-\_]+$'
    good_name = re.match(regex, display_name)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={'display_name': display_name})


def validate_full_name(full_name: str) -> str:
    error_message = f'''
        {full_name} is not a valid name. Names should be in title case and only contain letters'''
    regex = r'^[A-Za-z]+$'
    good_name = re.match(regex, full_name)
    if good_name:
        return good_name
    raise ValidationError(error_message, params={"full_name": full_name})
