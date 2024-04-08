from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from .models import List, Task
from .serializers import ListSerializer, TaskSerializer
from user_app.views import TokenReq


class All_lists(TokenReq):
    def get(self, request):
        lists = get_list_or_404(request.user.lists.all())
        ser_lists = ListSerializer(lists, many=True)
        return Response(ser_lists.data, status=HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        new_list = ListSerializer(data=data)
        if new_list.is_valid():
            new_list.save()
            return Response(new_list.data, status=HTTP_201_CREATED)
        return Response(new_list.errors, status=HTTP_400_BAD_REQUEST)


class A_list(TokenReq):
    def add_tasks(self, list, lst_of_task_ids):
        for task_id in lst_of_task_ids:
            if get_object_or_404(Task, id=task_id):
                list.tasks.add(task_id)
                list.save()

    def get_list(self, request, list_id):
        return get_object_or_404(request.user.lists, id=list_id)

    def get(self, request, list_id):
        return Response(ListSerializer(self.get_list(request, list_id)).data, status=HTTP_200_OK)

    def put(self, request, list_id):
        data = request.data.copy()
        curr_list = self.get_list(request, list_id)
        ser_list = ListSerializer(curr_list, data=data, partial=True)
        if ser_list.is_valid():
            ser_list.save()
            if data.get("lst_of_tasks"):
                self.add_tasks(
                    list=get_object_or_404(List, id=list_id), lst_of_task_ids=data.get("lst_of_tasks"))
            return Response(ser_list.data, status=HTTP_200_OK)
        return Response(ser_list.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, list_id):
        curr_list = self.get_list(request, list_id)
        curr_list.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class All_tasks(TokenReq):
    def get(self, request, list_id):
        try:
            tasks = TaskSerializer(
                request.user.lists.get(id=list_id).tasks, many=True)
            return Response(tasks.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request, list_id):
        data = request.data.copy()
        get_object_or_404(request.user.lists, id=list_id)
        data["list"] = list_id
        new_task = TaskSerializer(data=data)
        if new_task.is_valid():
            new_task.save()
            return Response(new_task.data, status=HTTP_201_CREATED)
        return Response(new_task.errors, status=HTTP_400_BAD_REQUEST)


class A_task(TokenReq):
    def get(self, request, list_id, task_id):
        task = TaskSerializer(get_object_or_404(Task, id=task_id))
        return Response(task.data, status=HTTP_200_OK)

    def put(self, request, list_id, task_id):
        data = request.data.copy()
        task = get_object_or_404(Task, id=task_id)
        ser_task = TaskSerializer(task, data=data, partial=True)
        if ser_task.is_valid():
            ser_task.save()
            # TODO: Check this with thunderclient to see if list auto completion and
            # auto incompletion works
            list = get_object_or_404(List, id=list_id)
            task_list = get_list_or_404(Task, list=list)
            completion_list = [x.completed for x in task_list]
            if False not in completion_list:
                list.completed = True
                list.save()
            else:
                list.completed = False
                list.save()
            return Response(ser_task.data, status=HTTP_200_OK)
        return Response(ser_task.errors, HTTP_400_BAD_REQUEST)

    def delete(self, request, list_id, task_id):
        task = get_object_or_404(Task, id=task_id)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)
