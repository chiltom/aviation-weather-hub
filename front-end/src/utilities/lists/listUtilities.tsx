import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { List } from "../../types/listTypes";
// All list related utility functions

/**
 * This function takes a list name as a parameter and sends a post request to
 * the server endpoint to create new list entry for the user. By default, this
 * list's tasks are empty and the completion status will be false.
 *
 * If the arguments are valid and the list is created in the database, the
 * server returns the data for the new list and the function returns the
 * new List object
 * @param name
 */
export const createList = async (name: string): Promise<List | null> => {
  try {
    const response: AxiosResponse = await api.post("lists/", {
      name: name,
      tasks: [],
    });
    if (response.status === 201) {
      const newList: List = {
        id: response.data["id"],
        name: response.data["name"],
        tasks: response.data["tasks"],
        completed: response.data["completed"],
      };
      return newList;
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
 * This function makes a get request to the server endpoint to grab an array
 * of all the user's current lists.
 *
 * If an array of lists is returned from the server, the array is then iterated
 * over and each element is destructred into a List object.
 *
 * This object is then pushed to the array and the list array is finally returned.
 */
export const getAllLists = async (): Promise<List[] | null> => {
  const response: AxiosResponse = await api.get("lists/");
  if (response.status === 200) {
    const userLists: List[] = [];
    for (const elem of response.data) {
      const list: List = {
        id: elem["id"],
        name: elem["name"],
        tasks: elem["tasks"],
        completed: elem["completed"],
      };
      userLists.push(list);
    }
    return userLists;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a list's id as an argument and makes a get request to
 * the server endpoint with the parameter attached to the url.
 *
 * If the list exists for the user in the database, the server will return the
 * list's data and the function will return a List object.
 *
 * If the list does not exist, the function returns null.
 * @param listId
 */
export const getAList = async (listId: number): Promise<List | null> => {
  const response: AxiosResponse = await api.get(`lists/${listId}/`);
  if (response.status === 200) {
    const list: List = {
      id: response.data["id"],
      name: response.data["name"],
      tasks: response.data["tasks"],
      completed: response.data["completed"],
    };
    return list;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes the current list's id and a new name as parameters and
 * sends a put request to the server endpoint to update the list with the
 * new data.
 *
 * If the update is successful, the updated list is returned.
 *
 * If the update is unsuccessful, the error is printed to the console and
 * null is returned.
 * @param listId
 * @param newName
 */
export const updateAList = async (
  listId: number,
  newName: string
  /* If needed later on add a new method for list of tasks and completed,
     but the function should work as is due to the nature of updating lists'
    completion status on the updating of a task, and list re-render SHOULD
    be implemented on task addition/deletion with a useEffect */
): Promise<List | null> => {
  try {
    const response: AxiosResponse = await api.put(`lists/${listId}/`, {
      name: newName,
    });
    if (response.status === 200) {
      const updatedList: List = {
        id: response.data["id"],
        name: response.data["name"],
        tasks: response.data["tasks"],
        completed: response.data["completed"],
      };
      return updatedList;
    } else {
      console.log("Updated failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * This function takes a list's id as its parameter and makes a delete request
 * to the server endpoint to delete the specified list.
 *
 * If the request is successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param listId
 */
export const deleteAList = async (listId: number): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(`lists/${listId}/`);
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
