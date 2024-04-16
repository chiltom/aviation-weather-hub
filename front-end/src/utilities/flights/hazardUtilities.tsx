import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Brief, Hazard } from "../../types/flightTypes";

/**
 * @description Creates a new Hazard for a Brief.
 *
 * @param {Brief} brief The Brief object the Hazard will be attached to.
 * @param {string} type The type of the Hazard. Must be title case and unique to the brief.
 * @param {string} information The Hazard's information. Must be title case.
 *
 * @returns {Promise<Hazard | null>} The new Hazard or null after resolution of the request.
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
 * @description Gets all of a Brief's Hazards.
 *
 * @param {Brief} brief The parent Brief object.
 *
 * @returns {Promise<Hazard[] | null>} The array of Hazards or null after resolution of the request.
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
 * @description Gets a specific Hazard within a Brief
 *
 * @param {Brief} brief The parent Brief object.
 * @param {number} hazardId The Hazard's id.
 *
 * @returns {Promise<Hazard | null>} The Hazard or null after resolution of the request.
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
 * @description Updates a Hazard within its parent Brief.
 *
 * @param {Brief} brief The parent Brief object.
 * @param {number} hazardId The Hazard's id.
 * @param {string} [type] An optional new type of the Hazard. Must be title case and unique to the brief.
 * @param {string} [information] An optional new information for the Hazard. Must be title case.
 *
 * @returns {Promise<Hazard | null>} The updated Hazard or null after resolution of the request.
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
 * @description Deletes a Hazard from its parent Brief.
 *
 * @param {Brief} brief The parent Brief object.
 * @param {number} hazardId The Hazard's id.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
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
