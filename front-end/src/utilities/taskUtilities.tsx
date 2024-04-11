import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
import { Task } from "./listUtilities";
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
