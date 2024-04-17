import { ReactElement, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { getAList } from "../../../utilities/lists/listUtilities";
import {
  createTask,
  updateTaskName,
  updateTaskCompleted,
  deleteATask,
} from "../../../utilities/lists/taskUtilities";
import { List, Task, TasksProps } from "../../../types/listTypes";

/**
 * @description A component that holds the Tasks within each parent ListAccordion
 * item and contains handlers for CRUD capability on the Tasks.
 *
 * @prop {List} list The parent List of the Tasks.
 * @prop {React.Dispatch<React.SetStateAction<List[]>>} setLists The setter function
 * for the lists state.
 *
 * @returns {ReactElement} Unordered list of Tasks.
 */
const TasksLists: React.FC<TasksProps> = ({ list, setLists }): ReactElement => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [createTaskListId, setCreateTaskListId] = useState<number | null>(null);
  const [createTaskName, setCreateTaskName] = useState<string>("");

  /**
   * @description Handles the event of clicking the button to create a new Task.
   *
   * @param {number} listId The parent List's id.
   */
  const handleCreateTaskEdit = (listId: number): void => {
    setCreateTaskListId(listId);
  };

  /**
   * @description Handles the submission to create a new Task.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {number} listId The parent List's id.
   */
  const handleCreateTaskSubmit = useCallback(
    async (listId: number): Promise<void> => {
      if (createTaskName.trim() !== "" && createTaskName) {
        const newTask: Task | null = await createTask(listId, createTaskName);
        if (newTask) {
          const updatedList: List | null = await getAList(listId);
          if (updatedList) {
            updatedList.completed = false;
            setLists((prevLists) =>
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
   * @description Handles the event of request to edit a Task.
   *
   * @param {number} taskId The Task's id.
   * @param {string} currentName The current name of the Task.
   */
  const handleEditTaskName = (taskId: number, currentName: string): void => {
    setEditTaskId(taskId);
    setNewTaskName(currentName);
  };

  /**
   * @description Handles the submission of the update of a Task to the handleTaskUpdate
   * function.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {number} listId The parent List's id.
   * @param {number} taskId The Task's id.
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
   * @description Handles the submission of a Task name update.
   *
   * @param {number} listId The parent List's id.
   * @param {number} taskId The Task's id.
   * @param {string} newName The new name of the Task.
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
   * @description Handles the update of a Task's completion status.
   *
   * @param {number} listId The parent List's id.
   * @param {number} taskId The Task's id.
   * @param {boolean} newCompleted The Task's new completion status.
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
   * @description Handles the deletion of a Task.
   *
   * @param {number} listId The parent List's id.
   * @param {number} taskId The Task's id.
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
                  variant="outline-primary"
                  size="sm"
                >
                  Save
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => setEditTaskId(null)}
                  size="sm"
                >
                  Cancel
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
                  variant="outline-secondary"
                  size="sm"
                  className="mr-2 edit-task-button"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleTaskDelete(list.id, task.id)}
                  variant="outline-danger"
                  size="sm"
                  className="delete-task-button"
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
          <InputGroup>
            <InputGroup.Text>Name</InputGroup.Text>
            <input
              type="text"
              value={createTaskName}
              onChange={(e) => setCreateTaskName(e.target.value)}
              className="form-control flex-grow-1 mr-2"
            />
            <Button
              onClick={() => handleCreateTaskSubmit(list.id)}
              variant="outline-primary"
              size="sm"
            >
              Save
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setCreateTaskListId(null)}
              size="sm"
            >
              Cancel
            </Button>
          </InputGroup>
        </div>
      ) : (
        <Button
          onClick={() => handleCreateTaskEdit(list.id)}
          variant="outline-primary"
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
