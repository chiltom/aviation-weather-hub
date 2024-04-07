from django.urls import path
from .views import All_lists, A_list, All_tasks, A_task

urlpatterns = [
    path('', All_lists.as_view(), name="all_lists"),
    path('<int:list_id>/', A_list.as_view(), name="a_list"),
    path('<int:list_id>/tasks/', All_tasks.as_view(), name="all_tasks"),
    path('<int:list_id>/tasks/<int:task_id>/', A_task.as_view(), name="a_task")
]
