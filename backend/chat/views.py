from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ai import ai_chat 

class ChatAPIView(APIView):
    def post(self, request):
        question = request.data.get('question')
        if not question:
            return Response({"error": "질문을 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)
        answer = ai_chat(question)
        return Response({"answer": answer}, status=status.HTTP_200_OK)
