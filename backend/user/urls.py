from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserAPIView.as_view()),
    path("<int:user_pk>/superuser", views.SuperUserAPIView.as_view()),
]