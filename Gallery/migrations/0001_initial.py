# Generated by Django 2.0.5 on 2018-12-01 16:13

import Gallery.models
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
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
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
                ('image', models.ImageField(upload_to=Gallery.models.gen_uuid)),
                ('title', models.CharField(max_length=30, verbose_name='Título')),
                ('uploadDate', models.DateTimeField(blank=True, default=datetime.datetime.now, verbose_name='date published')),
                ('approved', models.BooleanField(default=False)),
                ('censure', models.BooleanField(default=False)),
                ('permission', multiselectfield.db.fields.MultiSelectField(choices=[('CC BY', ('Atribución', 'descripción')), ('CC BY-SA', ('Atribución-CompartirIgual', 'd')), ('CC BY-ND', ('Atribución sin Derivadas', 'd')), ('CC BY-NC', ('Atribución No Comercial', 'd')), ('CC BY-NC-SA', ('Atribución NoComercial-CompartirIgual', 'd')), ('CC BY-NC-ND', ('Atribución NoComercial-SinDerivadas', 'd'))], max_length=3)),
                ('category', models.ManyToManyField(blank=True, to='Gallery.Category')),
                ('comments', models.ManyToManyField(blank=True, to='Gallery.Comment')),
            ],
        ),
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'usuario'), (2, 'foto'), (3, 'comentario')])),
            ],
        ),
        migrations.AddField(
            model_name='photo',
            name='report',
            field=models.ManyToManyField(blank=True, to='Gallery.Reporte'),
        ),
        migrations.AddField(
            model_name='comment',
            name='report',
            field=models.ManyToManyField(blank=True, to='Gallery.Reporte'),
        ),
        migrations.AddField(
            model_name='album',
            name='pictures',
            field=models.ManyToManyField(to='Gallery.Photo'),
        ),
    ]
