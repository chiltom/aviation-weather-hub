import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Brief } from "../../types/flightTypes";

/**
 * This function takes all of the required data for a brief record and makes
 * a post request to the server endpoint to create a new brief entry for the flight.
 *
 * If the arguments are valid and the brief is created in the database, the
 * server returns the data for the new brief and the function returns a Brief
 * object.
 *
 * If the arguments are invalid, the error is printed to the console and null
 * is returned.
 * @param flightId
 * @param surfaceWinds
 * @param flightLevelWinds
 * @param visibility
 * @param skyCondition
 * @param temperature
 * @param altimeterSetting
 * @param briefTime
 * @param voidTime
 */
export const createBrief = async (
  flightId: number,
  surfaceWinds: string,
  flightLevelWinds: string,
  visibility: string,
  skyCondition: string,
  temperature: string,
  altimeterSetting: string,
  briefTime: string,
  voidTime: string
): Promise<Brief | null> => {
  try {
    const response: AxiosResponse = await api.post(
      `flights/${flightId}/briefs/`,
      {
        surface_winds: surfaceWinds,
        flight_level_winds: flightLevelWinds,
        visibility: visibility,
        sky_condition: skyCondition,
        temperature: temperature,
        altimeter_setting: altimeterSetting,
        brief_time: briefTime,
        void_time: voidTime,
      }
    );
    if (response.status === 201) {
      const newBrief: Brief = {
        id: response.data["id"],
        flight: response.data["flight"],
        surfaceWinds: response.data["surface_winds"],
        flightLevelWinds: response.data["flight_level_winds"],
        visibility: response.data["visibility"],
        skyCondition: response.data["sky_condition"],
        temperature: response.data["temperature"],
        altimeterSetting: response.data["altimeter_setting"],
        briefTime: response.data["brief_time"],
        voidTime: response.data["void_time"],
        hazards: response.data["hazards"],
      };
      return newBrief;
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
 * This function takes a flight's id as a parameter and makes a get request
 * to the server endpoint to grab an array of all of the briefs associated with
 * the flight.
 *
 * If an array of briefs is returned from the server, it is iterated over and
 * each element is destructured into a Brief object.
 *
 * The destructured Brief objects are pushed to a separate array and the Brief
 * array is returned.
 *
 * If the request fails, the error is printed to the console and null is returned.
 * @param flightId
 */
export const getAllBriefs = async (
  flightId: number
): Promise<Brief[] | null> => {
  const response: AxiosResponse = await api.get(`flights/${flightId}/briefs/`);
  if (response.status === 200) {
    const flightBriefs: Brief[] = [];
    for (const elem of response.data) {
      const brief: Brief = {
        id: elem["id"],
        flight: elem["flight"],
        surfaceWinds: elem["surface_winds"],
        flightLevelWinds: elem["flight_level_winds"],
        visibility: elem["visibility"],
        skyCondition: elem["sky_condition"],
        temperature: elem["temperature"],
        altimeterSetting: elem["altimeter_setting"],
        briefTime: elem["brief_time"],
        voidTime: elem["void_time"],
        hazards: elem["hazards"],
      };
      flightBriefs.push(brief);
    }
    return flightBriefs;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a brief's id and the parent flight's id as parameters
 * and makes a get request to the server endpoint with the brief id attached
 * to the url.
 *
 * If the request is successful, the server returns the brief's info and the
 * function returns a Brief object.
 *
 * If the request fails, the error is printed to the console and null is returned.
 * @param flightId
 * @param briefId
 */
export const getABrief = async (
  flightId: number,
  briefId: number
): Promise<Brief | null> => {
  const response: AxiosResponse = await api.get(
    `flights/${flightId}/briefs/${briefId}/`
  );
  if (response.status === 200) {
    const brief: Brief = {
      id: response.data["id"],
      flight: response.data["flight"],
      surfaceWinds: response.data["surface_winds"],
      flightLevelWinds: response.data["flight_level_winds"],
      visibility: response.data["visibility"],
      skyCondition: response.data["sky_condition"],
      temperature: response.data["temperature"],
      altimeterSetting: response.data["altimeter_setting"],
      briefTime: response.data["brief_time"],
      voidTime: response.data["void_time"],
      hazards: response.data["hazards"],
    };
    return brief;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes the current brief's id and parent flight id as well
 * as the optional brief data elements as parameters and sends a put request
 * to the server endpoint to update the brief with the new data.
 *
 * If the update is successful, the updated Brief object is returned.
 *
 * If the updated is unsuccessful, the error is printed to the console and null
 * is returned.
 * @param flightId
 * @param briefId
 * @param newSurfaceWinds
 * @param newFlightLevelWinds
 * @param newVisibility
 * @param newSkyCondition
 * @param newTemperature
 * @param newAltimeterSetting
 * @param newBriefTime
 * @param newVoidTime
 */
export const updateABrief = async (
  flightId: number,
  briefId: number,
  newSurfaceWinds?: string,
  newFlightLevelWinds?: string,
  newVisibility?: string,
  newSkyCondition?: string,
  newTemperature?: string,
  newAltimeterSetting?: string
): Promise<Brief | null> => {
  const newData: {
    surface_winds?: string;
    flight_level_winds?: string;
    visibility?: string;
    sky_condition?: string;
    temperature?: string;
    altimeter_setting?: string;
  } = {};
  newSurfaceWinds !== "" && newSurfaceWinds
    ? (newData["surface_winds"] = newSurfaceWinds)
    : null;
  newFlightLevelWinds !== "" && newFlightLevelWinds
    ? (newData["flight_level_winds"] = newFlightLevelWinds)
    : null;
  newVisibility !== "" && newVisibility
    ? (newData["visibility"] = newVisibility)
    : null;
  newSkyCondition !== "" && newSkyCondition
    ? (newData["sky_condition"] = newSkyCondition)
    : null;
  newTemperature !== "" && newTemperature
    ? (newData["temperature"] = newTemperature)
    : null;
  newAltimeterSetting !== "" && newAltimeterSetting
    ? (newData["altimeter_setting"] = newAltimeterSetting)
    : null;
  try {
    const response: AxiosResponse = await api.put(
      `flights/${flightId}/briefs/${briefId}/`,
      newData
    );
    if (response.status === 200) {
      const updatedBrief: Brief = {
        id: response.data["id"],
        flight: response.data["flight"],
        surfaceWinds: response.data["surface_winds"],
        flightLevelWinds: response.data["flight_level_winds"],
        visibility: response.data["visibility"],
        skyCondition: response.data["sky_condition"],
        temperature: response.data["temperature"],
        altimeterSetting: response.data["altimeter_setting"],
        briefTime: response.data["brief_time"],
        voidTime: response.data["void_time"],
        hazards: response.data["hazards"],
      };
      return updatedBrief;
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
 * This function takes a brief's id and its parent flight's id as parameters
 * and makes a delete request to the server endpoint to delete the specified brief.
 *
 * If the request is successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param flightId
 * @param briefId
 */
export const deleteABrief = async (
  flightId: number,
  briefId: number
): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(
    `flights/${flightId}/briefs/${briefId}/`
  );
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
