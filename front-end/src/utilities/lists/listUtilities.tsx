import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { List } from "../../types/listTypes";
// All list related utility functions

/**
 * @description Creates a new List.
 *
 * @param {string} name The name of the list. Must be unique.
 *
 * @returns {Promise<List | null>} The new List or null after resolution of the request.
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
 * @description Gets all of a User's Lists.
 *
 * @returns {Promise<List[] | null>} The array of Lists or null after resolution of the request.
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
 * @description Gets a User's specified List.
 *
 * @param {number} listId The id of the List.
 *
 * @returns {Promise<List | null>} The List or null after resolution of the request.
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
 * @description Updates a List's name.
 *
 * @param {number} listId The List's id.
 * @param {string} newName The new name of the List.
 *
 * @returns {Promise<List | null>} The updated List or null after resolution of the request.
 */
export const updateAList = async (
  listId: number,
  newName: string
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
 * @description Deletes the User's specified List.
 *
 * @param {number} listId The List's id.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
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
