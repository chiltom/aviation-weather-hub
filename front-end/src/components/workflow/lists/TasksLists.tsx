import { ReactElement, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { getAList } from "../../../utilities/lists/listUtilities";
import {
  createTask,
  updateTaskName,
  updateTaskCompleted,
  deleteATask,
} from "../../../utilities/lists/taskUtilities";
import { List, Task, TasksProps } from "../../../types/listTypes";

const TasksLists: React.FC<TasksProps> = ({ list, setLists }): ReactElement => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [createTaskListId, setCreateTaskListId] = useState<number | null>(null);
  const [createTaskName, setCreateTaskName] = useState<string>("");

  /**
   * This function handles the creation of a new task by submitting the new task
   * name into the createTask function.
   *
   * It then awaits the completion of creating a new task and sets the
   * createTaskName state back to an empty string, as well as setting the create
   * task list id back to null.
   * @param listId
   */
  const handleCreateTaskSubmit = useCallback(
    async (listId: number): Promise<void> => {
      if (createTaskName.trim() !== "" && createTaskName) {
        const newTask: Task | null = await createTask(listId, createTaskName);
        if (newTask) {
          // If task updates successfully, get updated list for completion update
          const updatedList: List | null = await getAList(listId);
          if (updatedList) {
            // Don't hardcode this in the end, the back-end is updating this list to
            // false as of new task creation, figure out why this is not registering
            // while getting the updated list after task creation in the front-end
            updatedList.completed = false;
            setLists((prevLists) =>
              // Map over lists and find correct list, then set to updatedList,
              // if not proper list keep original values
              prevLists.map((list) => (list.id === listId ? updatedList : list))
            );
          }
        }
        setCreateTaskName("");
        setCreateTaskListId(null);
      }
    },
    [createTaskName]
  );

  /**
   * Function that handles the editing of a task name and attaches it to a button.
   *
   * If the button is clicked, it sets the edit task id state tot he current task's id
   * and sets the input box's value to the current task's name. It then allows the user
   * to edit the task's name and submit a new one.
   * @param taskId
   * @param currentName
   */
  const handleEditTaskName = (taskId: number, currentName: string): void => {
    setEditTaskId(taskId);
    setNewTaskName(currentName);
  };

  /**
   * This function handles the submission of the editing of a task's name.
   *
   * If the name is not empty and exists, the function then awaits the update of the
   * task's name by the handleTaskUpdate method below and then sets the edit task value
   * to null so no task is editable again.
   * @param listId
   * @param taskId
   */
  const handleSubmitTaskName = useCallback(
    async (listId: number, taskId: number): Promise<void> => {
      if (newTaskName.trim() !== "" && newTaskName) {
        await handleTaskUpdate(listId, taskId, newTaskName);
        setEditTaskId(null);
      }
    },
    [newTaskName]
  );

  /**
   * This function takes a list's id, the specific task's id, and a new name
   * for the task and calls the updateTaskName method to update the task's name.
   *
   * If the request is successful, it updates the lists state by mapping over the
   * previous lists and checking which list's id matches the list id parameter.
   *
   * Once it finds the correct list id, it returns a new list object with the updated
   * task inside. For other lists, they are left alone.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   * @param taskId
   * @param newName
   */
  const handleTaskUpdate = async (
    listId: number,
    taskId: number,
    newName: string
  ): Promise<void> => {
    const updatedTask: Task | null = await updateTaskName(
      listId,
      taskId,
      newName
    );
    if (updatedTask) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? /* If list id matches the parameter list's id, retain all other
               attributes of the list but map over the list's tasks and find
               the matching task id within. If the task's id matches the parameter
               task id, return the updated task, if not, return the original task */
              {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? updatedTask : task
                ),
              }
            : list
        )
      );
    }
  };

  /**
   * Event handler for the add new task button
   * @param listId
   */
  const handleCreateTaskEdit = (listId: number): void => {
    setCreateTaskListId(listId);
  };

  /**
   * This function takes a list's id, the specific task's id, and a new name
   * for the task and calls the updateTaskCompleted method to update the task's
   * completion status.
   *
   * If the request is successful, it updates the lists state by mapping over the
   * previous lists and checking which list's id matches the list id parameter.
   *
   * Once it finds the correct list id, it returns a new list object with the updated
   * task inside. For other lists, they are left alone.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   * @param taskId
   * @param newCompleted
   */
  const handleTaskCompletion = async (
    listId: number,
    taskId: number,
    newCompleted: boolean
  ): Promise<void> => {
    const updatedTask: Task | null = await updateTaskCompleted(
      listId,
      taskId,
      newCompleted
    );
    if (updatedTask) {
      // If task updates successfully, get updated list for completion update
      const updatedList: List | null = await getAList(listId);
      if (updatedList) {
        setLists((prevLists) =>
          // Map over lists and find correct list, then set to updatedList,
          // if not proper list keep original values
          prevLists.map((list) => (list.id === listId ? updatedList : list))
        );
      }
    }
  };

  /**
   * This function takes a list's id and a task's id as parameters and uses
   * the deleteATask method to delete a task.
   *
   * If this is successful, the updated list is grabbed from the server
   * using the getAList method and the updatedList replaces its old value
   * in the List array.
   * @param listId
   * @param taskId
   */
  const handleTaskDelete = async (
    listId: number,
    taskId: number
  ): Promise<void> => {
    const success: boolean = await deleteATask(listId, taskId);
    if (success) {
      const updatedList: List | null = await getAList(listId);
      if (updatedList) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === updatedList.id ? updatedList : list
          )
        );
      }
    }
  };

  return (
    <div>
      <ul className="list-unstyled">
        {list.tasks.map((task) => (
          <li
            key={task.id}
            className="mb-2 d-flex align-items-center justify-content-between"
          >
            {editTaskId === task.id ? (
              <div className="d-flex align-items-center w-100">
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="form-control flex-grow-1 mr-2"
                />
                <Button
                  onClick={() => handleSubmitTaskName(list.id, task.id)}
                  variant="primary"
                  size="sm"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center w-100">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    handleTaskCompletion(list.id, task.id, e.target.checked)
                  }
                  className="mr-2"
                />
                {task.completed ? (
                  <h4 className="text-lg font-medium flex-grow-1 my-0 mx-3 text-decoration-line-through fw-lighter">
                    {task.name}
                  </h4>
                ) : (
                  <h4 className="text-lg font-medium flex-grow-1 my-0 mx-3">
                    {task.name}
                  </h4>
                )}
                <Button
                  onClick={() => handleEditTaskName(task.id, task.name)}
                  variant="link"
                  size="sm"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleTaskDelete(list.id, task.id)}
                  variant="danger"
                  size="sm"
                >
                  Delete Task
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {createTaskListId === list.id ? (
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={createTaskName}
            onChange={(e) => setCreateTaskName(e.target.value)}
            className="form-control flex-grow-1 mr-2"
          />
          <Button
            onClick={() => handleCreateTaskSubmit(list.id)}
            variant="primary"
            size="sm"
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => handleCreateTaskEdit(list.id)}
          variant="success"
          size="sm"
          className="mt-2"
        >
          Create New Task
        </Button>
      )}
    </div>
  );
};

export default TasksLists;
