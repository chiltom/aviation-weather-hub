# Generated by Django 5.0.3 on 2024-04-07 19:41

import airport_app.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('airport_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airport',
            name='icao_code',
            field=models.CharField(max_length=4, unique=True, validators=[django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(4), airport_app.validators.validate_icao_code]),
        ),
    ]
