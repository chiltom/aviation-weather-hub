from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import List, Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
    
class ListSerializer(ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    user = SerializerMethodField()
    
    class Meta:
        model = List
        fields = "__all__"
    
    def get_user(self, instance):
        user = instance.user
        ser_user = {'user': user.display_name}
        return ser_user