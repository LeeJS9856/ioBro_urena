from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
# Create your views here.l

class UserAPIView(APIView) :
     # 프로필 조회
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    # 회원가입
    def post(self, request):
        
        user_data = UserSerializer(data=request.data)
        if user_data.is_valid(raise_exception=True):
            user_data.save()
            return Response(user_data.data, status=status.HTTP_201_CREATED)

    # 계정 정보 수정
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    # 계정 삭제
    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SuperUserAPIView(APIView):
    def put(self, request, user_pk):
        user = User.objects.get(pk=user_pk)
        user.is_superuser = not user.is_superuser
        user.save()
        return Response(status=status.HTTP_200_OK)