import { ReactElement, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import {
  List,
  createList,
  getAList,
  getAllLists,
  updateAList,
  deleteAList,
} from "../utilities/listUtilities";
import {
  Task,
  createTask,
  updateTaskName,
  updateTaskCompleted,
  deleteATask,
} from "../utilities/taskUtilities";
import { ContextType } from "../utilities/userUtilities";

const Lists = ({ theme }: ContextType): ReactElement => {
  const [lists, setLists] = useState<List[]>([]);
  const [editListId, setEditListId] = useState<number | null>(null);
  const [newListName, setNewListName] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [createListStatus, setCreateListStatus] = useState<boolean>(false);
  const [createListName, setCreateListName] = useState<string>("");
  const [createTaskListId, setCreateTaskListId] = useState<number | null>(null);
  const [createTaskName, setCreateTaskName] = useState<string>("");

  useEffect(() => {
    const fetchLists = async (): Promise<void> => {
      const fetchedLists: List[] | null = await getAllLists();
      if (fetchedLists) {
        setLists(fetchedLists);
      }
    };
    fetchLists();
  }, []);

  /**
   * Handler for create new list button
   */
  const handleCreateListEdit = (): void => {
    setCreateListStatus(true);
  };

  /**
   * This function handles the creation of a new list by submitting the new list
   * name into the createList function.
   *
   * It then awaits the completion of creating a new list and sets the
   * createListName state back to null.
   */
  const handleCreateListSubmit = async (): Promise<void> => {
    if (createListName.trim() !== "" && createListName) {
      const newList: List | null = await createList(createListName);
      if (newList) {
        setLists((prevLists) => prevLists.concat(newList));
      }
      setCreateListName("");
      setCreateListStatus(false);
    }
  };

  /**
   * This function takes a list update event and attempts to use the updateAList
   * method to update the list.
   *
   * If the request is successful, the lists are mapped over and if a previous
   * list's id matches the updated list's id, it is replaced with the updated List object.
   * All others are replaced with their original List object.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   * @param newName
   */
  const handleListUpdate = async (
    listId: number,
    newName: string
  ): Promise<void> => {
    const updatedList: List | null = await updateAList(listId, newName);
    if (updatedList) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === updatedList.id ? updatedList : list
        )
      );
    }
  };

  /**
   * This function takes a list's id as its parameter and attempts to use the
   * deleteAList method to delete the list.
   *
   * If the request is successful, the previous lists are mapped over and if the
   * deleted list's id matches a list id in the previous lists, it is filtered out.
   * Otherwise, the remaining lists are left.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   */
  const handleListDelete = async (listId: number): Promise<void> => {
    const success: boolean = await deleteAList(listId);
    if (success) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    }
  };

  /**
   * Function that handles the editing of a list name and attaches it to a button.
   *
   * If the button is clicked, it sets the edit list id state to the current list's
   * id and sets the input box's value to the current list's name. It then allows
   * the user to edit the list's name and submit a new one.
   * @param listId
   * @param currentName
   */
  const handleEditListName = (listId: number, currentName: string): void => {
    setEditListId(listId);
    setNewListName(currentName);
  };

  /**
   * This function handles the submission of the editing of a list's name.
   *
   * If the name is not empty and exists, the function then awaits the update of
   * the list's name by the handleListUpdate method above and then sets the edit
   * list id value to null so no list is editable again.
   * @param listId
   */
  const handleSubmitListName = async (listId: number): Promise<void> => {
    if (newListName.trim() !== "" && newListName) {
      await handleListUpdate(listId, newListName);
      setEditListId(null);
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
   * This function handles the creation of a new task by submitting the new task
   * name into the createTask function.
   *
   * It then awaits the completion of creating a new task and sets the
   * createTaskName state back to null.
   * @param listId
   */
  const handleCreateTaskSubmit = async (listId: number): Promise<void> => {
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
  };

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
  const handleSubmitTaskName = async (
    listId: number,
    taskId: number
  ): Promise<void> => {
    if (newTaskName.trim() !== "" && newTaskName) {
      await handleTaskUpdate(listId, taskId, newTaskName);
      setEditTaskId(null);
    }
  };

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
   * using the getAList method and the updatedList replaces it's old value
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
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Lists</h2>
      <Container
        data-bs-theme={theme}
        className="border border-secondary d-flex flex-column rounded-3 p-0 align-items-end"
        fluid
      >
        <Accordion
          defaultActiveKey="0"
          className="d-flex flex-column flex-grow-1 w-100"
        >
          {lists.map((list, index) => (
            <Accordion.Item key={list.id} eventKey={`${index}`}>
              <Accordion.Header className="flex w-full">
                {editListId === list.id ? (
                  <div className="d-flex flex-grow-1 me-3">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="form-control flex-grow mr-2"
                    />
                    <Button
                      onClick={() => handleSubmitListName(list.id)}
                      variant="primary"
                      size="sm"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    {list.completed ? (
                      <h3 className="d-flex align-items-center text-decoration-line-through fw-lighter">
                        {list.name}
                      </h3>
                    ) : (
                      <h3 className="d-flex align-items-center">{list.name}</h3>
                    )}
                    <div className="d-flex align-items-center mx-3">
                      <Button
                        onClick={() => handleEditListName(list.id, list.name)}
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                      >
                        Rename List
                      </Button>
                      <Button
                        onClick={() => handleListDelete(list.id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete List
                      </Button>
                    </div>
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="d-flex flex-column">
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
                            onClick={() =>
                              handleSubmitTaskName(list.id, task.id)
                            }
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
                              handleTaskCompletion(
                                list.id,
                                task.id,
                                e.target.checked
                              )
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
                            onClick={() =>
                              handleEditTaskName(task.id, task.name)
                            }
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {createListStatus === false ? (
          <Button
            onClick={() => handleCreateListEdit()}
            variant="primary"
            className="w-25"
          >
            Create New List
          </Button>
        ) : (
          <div className="flex items-center d-flex">
            <input
              type="text"
              value={createListName}
              onChange={(e) => setCreateListName(e.target.value)}
              className="form-control flex-grow mr-2"
            />
            <Button
              onClick={() => handleCreateListSubmit()}
              variant="primary"
              size="sm"
            >
              Save
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Lists;
