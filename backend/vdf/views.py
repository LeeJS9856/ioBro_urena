from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import VDF, VDFSurvey, VDFSurveyAnswer, VDFSurveyQuestion
from .serializers import VDFSerializer, VDFSurveySerializer, VDFSurveyAnswerSerializer, VDFSurveyQuestionSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class VDFAPIView(APIView):
    def get(self, request, user_pk):
        vdf = VDF.objects.filter(user__pk = user_pk)
        serializer = VDFSerializer(vdf, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, user_pk):
        serializer = VDFSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user_pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VDFAPIDetailView(APIView):
    def put(self, request, vdf_pk):
        vdf = get_object_or_404(VDF, pk=vdf_pk)
        serializer = VDFSerializer(vdf, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, vdf_pk):
        vdf = get_object_or_404(VDF, pk=vdf_pk)
        vdf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VDFSurveyAPIView(APIView):
    def get(self, request, user_pk):
        vdf_survey = VDFSurvey.objects.filter(user__pk = user_pk)
        serializer = VDFSurveySerializer(vdf_survey, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, user_pk):
        serializer = VDFSurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user_pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VDFSurveyDetailAPIView(APIView):
    def put(self, request, vdfsurvey_pk):
        vdf_survey = get_object_or_404(VDFSurvey, pk=vdfsurvey_pk)
        serializer = VDFSurveySerializer(vdf_survey, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, vdfsurvey_pk):
        vdf_survey = get_object_or_404(VDFSurvey, pk=vdfsurvey_pk)
        vdf_survey.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VDFQuestionAPIView(APIView):
    def get(self, request):
        vdf_question = VDFSurveyQuestion.objects.all()
        serializer = VDFSurveyQuestionSerializer(vdf_question, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VDFSurveyQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VDFQuestionDetailAPIView(APIView):
    def put(self, request, question_pk):
        vdf_question = get_object_or_404(VDFSurveyQuestion, pk=question_pk)
        serializer = VDFSurveyQuestionSerializer(vdf_question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, question_pk):
        vdf_question = get_object_or_404(VDFSurveyQuestion, pk=question_pk)
        vdf_question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)