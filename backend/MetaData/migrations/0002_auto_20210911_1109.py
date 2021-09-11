# Generated by Django 3.2 on 2021-09-11 14:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Gallery', '0001_initial'),
        ('MetaData', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tagsuggestion',
            name='metadata',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tagsuggestion_metadata', to='MetaData.metadata'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tagsuggestion',
            name='photo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tagsuggestion_photo', to='Gallery.photo'),
            preserve_default=False,
        ),
    ]
