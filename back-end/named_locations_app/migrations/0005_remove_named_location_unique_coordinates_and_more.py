# Generated by Django 5.0.3 on 2024-04-16 02:41

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('named_locations_app', '0004_alter_named_location_latitude_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='named_location',
            name='unique coordinates',
        ),
        migrations.AddConstraint(
            model_name='named_location',
            constraint=models.UniqueConstraint(fields=('latitude', 'longitude', 'user'), name='unique coordinates per user'),
        ),
    ]
