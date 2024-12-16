from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from user.models import User
from vdf.models import VDF
from django.contrib.auth.hashers import check_password


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        username = attrs['username']
        password = attrs['password']
        try:
            user = User.objects.get(username=username)
        except:
            raise ValidationError({"detail": "아이디가 틀렸습니다"})

        if not check_password(password, user.password):
            raise ValidationError({"detail": "비밀번호가 틀렸습니다."})

        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # VDF 정보 추가
        try:
            vdf = VDF.objects.get(user=user)
            token['vdf'] = {
                "username" : user.username,
                "vdf": vdf.vdf,
            }
        except VDF.DoesNotExist:
            token['vdf'] = None

        return token
