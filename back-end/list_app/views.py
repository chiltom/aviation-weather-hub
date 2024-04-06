from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from .models import List, Task
from .serializers import ListSerializer, TaskSerializer
from user_app.views import TokenReq

class All_lists(TokenReq):
    def get(self, request):
        lists = get_list_or_404(request.user.lists.all())
        ser_lists = ListSerializer(lists, many=True)
        return Response(ser_lists.data, status=HTTP_200_OK)