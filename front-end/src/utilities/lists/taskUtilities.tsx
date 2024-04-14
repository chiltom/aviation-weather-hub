import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Task } from "../../types/listTypes";
// All task related utility functions

/**
 * This function takes a listId and name for a task as arguments and sends a
 * post request to the server endpoint with this data to create a new task
 * entry for the user.
 * @param listId
 * @param name
 */
export const createTask = async (
  listId: number,
  name: string
): Promise<Task | null> => {
  try {
    const response: AxiosResponse = await api.post(`lists/${listId}/tasks/`, {
      name: name,
    });
    if (response.status === 201) {
      const newTask: Task = {
        id: response.data["id"],
        list: response.data["list"],
        name: response.data["name"],
        completed: response.data["completed"],
      };
      return newTask;
    } else {
      console.log("Post request failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * This function takes a list's id as a parameter and makes a get request to the
 * proper server endpoint to grab all tasks associated with that list.
 *
 * If the request is successful, an array of tasks is returned in the response,
 * which is then iterated over and each element is destructured into a Task
 * object. The task object is then pushed to an array of Tasks.
 *
 * Finally, with the successful response, an array of Tasks is returned.
 *
 * If the request is unsuccessful, the error is logged to the console and null
 * is returned.
 * @param listId
 */
export const getAllTasks = async (listId: number): Promise<Task[] | null> => {
  const response: AxiosResponse = await api.get(`lists/${listId}/tasks/`);
  if (response.status === 200) {
    const userTasksArr: Task[] = [];
    for (const elem of response.data) {
      const task: Task = {
        id: elem["id"],
        list: elem["list"],
        name: elem["name"],
        completed: elem["completed"],
      };
      userTasksArr.push(task);
    }
    return userTasksArr;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a list's id and a task's id as parameters and makes a get
 * request to the server endpoint with these parameters attached to the url.
 *
 * If the task exists within the list, the server will return the task's data and
 * the function will return a Task object.
 *
 * If the task does not exist, the function returns null.
 * @param listId
 * @param taskId
 */
export const getATask = async (
  listId: number,
  taskId: number
): Promise<Task | null> => {
  const response: AxiosResponse = await api.get(
    `lists/${listId}/tasks/${taskId}/`
  );
  if (response.status === 200) {
    const task: Task = {
      id: response.data["id"],
      list: response.data["list"],
      name: response.data["name"],
      completed: response.data["completed"],
    };
    return task;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a task's id and its parent list's id, as well as a new
 * name, as parameters and sends a put request to the server endpoint to update
 * the task in the database.
 *
 * If the new name is valid, the task is updated and the new task object is
 * returned.
 *
 * If the new name is invalid or the update fails, the error is printed to
 * the console and null is returned
 * @param listId
 * @param taskId
 * @param newName
 */
export const updateTaskName = async (
  listId: number,
  taskId: number,
  newName: string
): Promise<Task | null> => {
  try {
    const response: AxiosResponse = await api.put(
      `lists/${listId}/tasks/${taskId}/`,
      {
        name: newName,
      }
    );
    if (response.status === 200) {
      const updatedTask: Task = {
        id: response.data["id"],
        list: response.data["list"],
        name: response.data["name"],
        completed: response.data["completed"],
      };
      return updatedTask;
    } else {
      console.log("Update failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error sending request: ", error);
    return null;
  }
};

/**
 * This function takes a task's id and its parent list's id and a new completion
 * status as parameters and sends a put request to the server endpoint to
 * update the task in the database.
 *
 * If the update is sucessfully processed, the updated task is returned.
 *
 * If the update is not processed, the error is printed to the console and
 * null is returned.
 * @param listId
 * @param taskId
 * @param newCompleted
 */
export const updateTaskCompleted = async (
  listId: number,
  taskId: number,
  newCompleted: boolean
): Promise<Task | null> => {
  try {
    const response: AxiosResponse = await api.put(
      `lists/${listId}/tasks/${taskId}/`,
      {
        completed: newCompleted,
      }
    );
    if (response.status === 200) {
      const updatedTask: Task = {
        id: response.data["id"],
        list: response.data["list"],
        name: response.data["name"],
        completed: response.data["completed"],
      };
      return updatedTask;
    } else {
      console.log("Update failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error sending request: ", error);
    return null;
  }
};

/**
 * This function takes a task's id and its parent list's id and sends a delete
 * request to the server to delete the specified task.
 *
 * If the request was successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param listId
 * @param taskId
 */
export const deleteATask = async (
  listId: number,
  taskId: number
): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(
    `lists/${listId}/tasks/${taskId}/`
  );
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
