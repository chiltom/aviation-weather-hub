from rest_framework.serializers import ModelSerializer
from .models import List, Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class ListSerializer(ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = "__all__"
