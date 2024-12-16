from rest_framework import serializers
from .models import VDF, VDFSurvey, VDFSurveyAnswer, VDFSurveyQuestion

class VDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = VDF
        fields = ("vdf",)

class VDFSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = VDFSurvey
        fields = '__all__'

class VDFSurveyAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VDFSurveyAnswer
        fields = '__all__'

class VDFSurveyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VDFSurveyQuestion
        fields = '__all__'