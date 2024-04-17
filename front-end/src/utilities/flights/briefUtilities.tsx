import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Brief } from "../../types/flightTypes";

/**
 * @description Creates a new Brief within a parent Flight. The brief time and flight Id must be unqiue
 * together.
 *
 * @param {number} flightId The parent Flight's id.
 * @param {string} surfaceWinds The surface winds enroute. Must consist of wind direction, wind
 * speed, gusts and speeds if applicable, and KT at the end, all uppercase, only letters and digits.
 * Examples: VRB09KT, 27013KT, VRB08G15KT, 09017G25KT.
 * @param {string} flightLevelWinds The winds at flight level altitude enroute. Must consist of wind
 * direction, wind speed, gusts and speeds if applicable, and KT at the end, all uppercase, only letters
 * and digits. Examples: VRB09KT, 27013KT, VRB08G15KT, 09017G25KT.
 * @param {string} visibility The visibility at surface. Must be digits, spaces, or slashes, and end in SM.
 * The highest possible number is 10, and the maximum length is 7, all letters uppercase. Examples: 1 1/4SM, 10SM.
 * @param {string} skyCondition The sky condition at surface. If multiple values exist, must be broken up
 * with spaces between the values. Must be a valid sky condition. Example: SCT016 BKN030 OVC050.
 * @param {string} temperature The temperature enroute. Must be in Celsius and, if negative, insert an M
 * prior to the number. Examples: 22, M01.
 * @param {string} altimeterSetting The altimeter setting enroute. Must start with A. Example: A3018.
 * @param {string} briefTime The time the brief will be conducted. Format is YYYY-MM-DDTHH:MM:SSZ.
 * @param {string} voidTime The time the brief will be voided. Format is YYYY-MM-DDTHH:MM:SSZ.
 *
 * @returns {Promise<Brief | null>} The new Brief or null after resolution of the request.
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
 * @description Gets all of the Briefs associated with a parent Flight.
 *
 * @param {number} flightId The parent Flight's id.
 *
 * @returns {Promise<Brief[] | null>} The array of Briefs or null after resolution of the request.
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
 * @description Gets a specified Brief within its parent Flight
 *
 * @param {number} flightId The parent Flight's id.
 * @param {number} briefId The Brief's id.
 *
 * @returns {Promise<Brief | null>} The Brief or null after resolution of the request.
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
 * @description Updates a Brief within its parent Flight.
 *
 * @param {number} flightId The parent Flight's id.
 * @param {number} briefId The Brief's id.
 * @param {string} [newSurfaceWinds] Optional new surface winds enroute. Must consist of wind direction, wind
 * speed, gusts and speeds if applicable, and KT at the end, all uppercase, only letters and digits.
 * Examples: VRB09KT, 27013KT, VRB08G15KT, 09017G25KT.
 * @param {string} [newFlightLevelWinds] Optional new winds at flight level altitude enroute. Must consist of wind
 * direction, wind speed, gusts and speeds if applicable, and KT at the end, all uppercase, only letters
 * and digits. Examples: VRB09KT, 27013KT, VRB08G15KT, 09017G25KT.
 * @param {string} [newVisibility] Optional new visibility at surface. Must be digits, spaces, or slashes, and end in SM.
 * The highest possible number is 10, and the maximum length is 7, all letters uppercase. Examples: 1 1/4SM, 10SM.
 * @param {string} [newSkyCondition] Optional new sky condition at surface. If multiple values exist, must be broken up
 * with spaces between the values. Must be a valid sky condition. Example: SCT016 BKN030 OVC050.
 * @param {string} [newTemperature] Optional new temperature enroute. Must be in Celsius and, if negative, insert an M
 * prior to the number. Examples: 22, M01.
 * @param {string} [newAltimeterSetting] Optional new altimeter setting enroute. Must start with A. Example: A3018.
 *
 * @returns {Promise<Brief | null>} The updated Brief or null after resolution of the request.
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
 * @description Deletes a Brief from its parent Flight.
 *
 * @param {number} flightId The parent Flight's id.
 * @param {number} briefId The Brief's id.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
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
