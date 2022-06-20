# Generated by Django 4.0.4 on 2022-06-20 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_area_areaid_alter_route_routeid'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='beta',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='post',
            name='conditions',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='post',
            name='grading',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True),
        ),
        migrations.AlterField(
            model_name='area',
            name='areaID',
            field=models.BigIntegerField(default=-1575863454718153647, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='route',
            name='routeID',
            field=models.BigIntegerField(default=-4803438360907584321, primary_key=True, serialize=False),
        ),
    ]
