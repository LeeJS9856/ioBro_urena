from rest_framework import serializers
from .models import UserQuestion

class UserQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuestion
        fields = '__all__'  # 모든 필드를 포함
