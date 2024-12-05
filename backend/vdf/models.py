from django.db import models

class VDF(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    vision = models.BooleanField(default=False)
    direction = models.BooleanField(default=False)
    force = models.BooleanField(default=False)

class VDFSurvey(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    survey_at = models.DateTimeField(auto_now_add=True)
    vision = models.FloatField(default=0.0)
    objectivity = models.FloatField(default=0.0)
    understanding = models.FloatField(default=0.0)
    execution = models.FloatField(default=0.0)
    endurance = models.FloatField(default=0.0)
    willingness = models.FloatField(default=0.0)

class VDFSurveyQuestion(models.Model):
    question = models.TextField()
    PROPENSITY_CHOICES = [
        ('vision', '목표'),
        ('objectivity', '자기객관성'),
        ('understanding', '목표이해도'),
        ('execution', '실행력'),
        ('endurance', '지구력'),
        ('willingness', '의지'),
        ('reliability', '신뢰성 문항')
    ]
    property = models.CharField(max_length=20, choices=PROPENSITY_CHOICES)
    is_essay = models.BooleanField(default=False)

class VDFSurveyAnswer(models.Model):
    survey = models.ForeignKey('vdf.VDFSurvey', on_delete=models.CASCADE)
    question = models.ForeignKey('vdf.VDFSurveyQuestion', on_delete=models.CASCADE)
    answer_int = models.IntegerField(null=True, blank=True)
    answer_text = models.TextField(null = True, blank=True)


