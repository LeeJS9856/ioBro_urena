from django.db import models
from django.contrib.auth.models import User


class UserQuestion(models.Model):
    vdf = models.CharField(max_length=10)
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    session_id = models.CharField(max_length=100)