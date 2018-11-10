# Generated by Django 2.0.5 on 2018-10-27 15:50

import datetime
from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('censure', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('title', models.CharField(max_length=30, verbose_name='Título')),
                ('uploadDate', models.DateTimeField(blank=True, default=datetime.datetime.now, verbose_name='date published')),
                ('approved', models.BooleanField(default=False)),
                ('censure', models.BooleanField(default=False)),
                ('permission', multiselectfield.db.fields.MultiSelectField(choices=[('a', 'Hola'), ('b', 'Hello'), ('c', 'Bonjour'), ('d', 'Boas')], max_length=3)),
                ('comments', models.ManyToManyField(to='Gallery.Comment')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='pictures',
            field=models.ManyToManyField(to='Gallery.Photo'),
        ),
    ]
