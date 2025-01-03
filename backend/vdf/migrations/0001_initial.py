# Generated by Django 4.2.12 on 2024-12-01 19:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VDFSurvey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('survey_at', models.DateTimeField(auto_now_add=True)),
                ('vision', models.FloatField(default=0.0)),
                ('objectivity', models.FloatField(default=0.0)),
                ('understanding', models.FloatField(default=0.0)),
                ('execution', models.FloatField(default=0.0)),
                ('endurance', models.FloatField(default=0.0)),
                ('willingness', models.FloatField(default=0.0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VDFSurveyQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('property', models.CharField(choices=[('vision', '목표'), ('objectivity', '자기객관성'), ('understanding', '목표이해도'), ('execution', '실행력'), ('endurance', '지구력'), ('willingness', '의지'), ('reliability', '신뢰성 문항')], max_length=20)),
                ('is_essay', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='VDFSurveyAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_int', models.IntegerField(blank=True, null=True)),
                ('answer_text', models.TextField(blank=True, null=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vdf.vdfsurveyquestion')),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vdf.vdfsurvey')),
            ],
        ),
        migrations.CreateModel(
            name='VDF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vision', models.BooleanField(default=False)),
                ('direction', models.BooleanField(default=False)),
                ('force', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
