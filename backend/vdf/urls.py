from django.urls import path
from . import views

urlpatterns = [
    path("/user/<int:user_pk>", views.VDFAPIView.as_view()),
    path("/user/<int:user_pk>/detail", views.VDFAPIDetailView.as_view()),
    path("/survey/<int:user_pk>", views.VDFSurveyAPIView.as_view()),
    path("/survey/<int:vdfsurvey_pk>/detail", views.VDFSurveyDetailAPIView.as_view()),
    path("/question", views.VDFQuestionAPIView.as_view()),
    path("/question/<int:question_pk>", views.VDFQuestionDetailAPIView.as_view())
]