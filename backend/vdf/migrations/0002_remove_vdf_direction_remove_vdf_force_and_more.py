# Generated by Django 4.2.12 on 2024-12-15 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vdf', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vdf',
            name='direction',
        ),
        migrations.RemoveField(
            model_name='vdf',
            name='force',
        ),
        migrations.RemoveField(
            model_name='vdf',
            name='vision',
        ),
        migrations.AddField(
            model_name='vdf',
            name='vdf',
            field=models.CharField(choices=[('N', 'N'), ('V1', 'V1'), ('D1', 'D1'), ('F1', 'F1'), ('V2', 'V2'), ('D2', 'D2'), ('F2', 'F2'), ('VD1', 'VD1'), ('VD2', 'VD2'), ('VF1', 'VF1'), ('VF2', 'VF2'), ('DF1', 'DF1'), ('DF2', 'DF2'), ('VDF1', 'VDF1'), ('VDF2', 'VDF2')], default='N', max_length=4),
        ),
    ]
