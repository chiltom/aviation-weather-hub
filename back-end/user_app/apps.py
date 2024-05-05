"""Holds default configurations for the User app.

Classes:
    UserAppConfig
"""

from django.apps import AppConfig


class UserAppConfig(AppConfig):
    """The default configuration for the User app.

    Extends:
        AppConfig (class): Django default application configuration class.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_app'
