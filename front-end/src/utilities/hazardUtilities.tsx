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
