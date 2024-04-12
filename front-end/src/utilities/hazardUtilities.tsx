import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
import { Brief } from "./briefUtilities";

/**
 * The Hazard interface defines the properties of a hazard, which consist of:
 * - Hazard id
 * - Parent brief's id
 * - The type of hazard
 * - The information pertaining to the hazard
 */
export interface Hazard {
  id: number;
  brief: number;
  type: string;
  information: string;
}

/**
 * This function takes all of the required data for a hazard record as well
 * as the parent Brief object as parameters and makes a post request
 * to the server endpoint to create a new hazard entry for the brief.
 *
 * If the arguments are valid and the hazard is created in the database, the
 * server returns the data for the new hazard and the function returns a Hazard
 * object.
 *
 * If the arguments are invalid, the error is printed to the console and null
 * is returned.
 * @param brief
 * @param type
 * @param information
 */
export const createHazard = async (
  brief: Brief,
  type: string,
  information: string
): Promise<Hazard | null> => {
  try {
    const response: AxiosResponse = await api.post(
      `flights/${brief.flight}/briefs/${brief.id}/hazards/`,
      {
        type: type,
        information: information,
      }
    );
    if (response.status === 201) {
      const newHazard: Hazard = {
        id: response.data["id"],
        brief: response.data["brief"],
        type: response.data["type"],
        information: response.data["information"],
      };
      return newHazard;
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
 * of all of the brief's current hazards with the parent Brief object as its
 * parameter.
 *
 * If an array of hazards is returned from the server, the array is then iterated
 * over and each element is destructured into a Hazard object. The destructured objects
 * are all pushed to a separate Hazard array that is returned.
 *
 * If the server returns an error, the error is printed to the console and
 * null is returned.
 * @param brief
 */
export const getAllHazards = async (brief: Brief): Promise<Hazard[] | null> => {
  const response: AxiosResponse = await api.get(
    `flights/${brief.flight}/briefs/${brief.id}/hazards/`
  );
  if (response.status === 200) {
    const briefHazards: Hazard[] = [];
    for (const elem of response.data) {
      const hazard: Hazard = {
        id: elem["id"],
        brief: elem["brief"],
        type: elem["type"],
        information: elem["information"],
      };
      briefHazards.push(hazard);
    }
    return briefHazards;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a brief object and a hazards id as its parameters and
 * makes a get request to the server endpoint with the parameters attached to
 * the url.
 *
 * If the request is successful, the server returns the hazard's info and the
 * function returns a Hazard object.
 *
 * If the request fails, the error is printed to the console and null is returned.
 * @param brief
 * @param hazardId
 */
export const getAHazard = async (
  brief: Brief,
  hazardId: number
): Promise<Hazard | null> => {
  const response: AxiosResponse = await api.get(
    `flights/${brief.flight}/briefs/${brief.id}/hazards/${hazardId}/`
  );
  if (response.status === 200) {
    const hazard: Hazard = {
      id: response.data["id"],
      brief: response.data["brief"],
      type: response.data["type"],
      information: response.data["information"],
    };
    return hazard;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes the current hazard's id and a Brief object as necessary
 * parameters, and takes option hazard data elements as parameters and sends a
 * put request to the server endpoint to update the hazard with the new data.
 *
 * If the update is successful, the updated Hazard object is returned.
 *
 * If the update i unsuccessful, the error is printed to the console and null
 * is returned.
 * @param brief
 * @param hazardId
 * @param type
 * @param information
 */
export const updateAHazard = async (
  brief: Brief,
  hazardId: number,
  type?: string,
  information?: string
): Promise<Hazard | null> => {
  const newData: {
    type?: string;
    information?: string;
  } = {};
  type !== "" && type ? (newData["type"] = type) : null;
  information !== "" && information
    ? (newData["information"] = information)
    : null;
  try {
    const response: AxiosResponse = await api.put(
      `flights/${brief.flight}/briefs/${brief.id}/hazards/${hazardId}/`,
      newData
    );
    if (response.status === 200) {
      const updatedHazard: Hazard = {
        id: response.data["id"],
        brief: response.data["brief"],
        type: response.data["type"],
        information: response.data["information"],
      };
      return updatedHazard;
    } else {
      console.log("Update failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * This function takes a hazard's id and a brief object as its parameters and
 * makes a delete request to the server endpoint to delete the specified hazard.
 *
 * If the request is successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param brief
 * @param hazardId
 */
export const deleteAHazard = async (
  brief: Brief,
  hazardId: number
): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(
    `flights/${brief.flight}/briefs/${brief.id}/hazards/${hazardId}/`
  );
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
