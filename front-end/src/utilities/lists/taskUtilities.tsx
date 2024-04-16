import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Task } from "../../types/listTypes";
// All task related utility functions

/**
 * @description Creates a new Task inside of the specified parent List.
 *
 * @param {number} listId The parent list's id.
 * @param {string} name The name of the task.
 *
 * @returns {Promise<Task | null>} The new Task or null after resolution of the request.
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
 * @description Gets all of the Tasks in the specified List.
 *
 * @param {number} listId The parent List id.
 *
 * @returns {Promise<Task[] | null>} The array of Tasks or null after resolution of the request.
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
 * @description Gets a specified Task within the parent List.
 *
 * @param {number} listId The parent List id.
 * @param {number} taskId The Task id.
 *
 * @returns {Promise<Task | null>} The Task or null after resolution of the request.
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
 * @description Updates a Task's name.
 *
 * @param {number} listId The parent List's id.
 * @param {number} taskId The Task's id.
 * @param {string} newName The new name of the Task.
 *
 * @return {Promise<Task | null>} The updated Task or null after resolution of the request.
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
 * @description Updates a Task's completion status
 *
 * @param {number} listId The parent List's id.
 * @param {number} taskId The Task's id.
 * @param {boolean} newCompleted The completion status of the Task.
 *
 * @returns {Promise<Task | null>} The updated Task or null after resolution of the request.
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
 * @description Deletes a Task from its parent List.
 *
 * @param {number} listId The parent List's id.
 * @param {number} taskId The Task's id.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
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
