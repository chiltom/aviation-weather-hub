# Generated by Django 5.0.3 on 2024-04-16 02:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('airport_app', '0003_alter_airport_icao_code'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='airport',
            constraint=models.UniqueConstraint(fields=('icao_code', 'user'), name='unique icao code per user'),
        ),
    ]
