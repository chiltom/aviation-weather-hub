import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Airport } from "../../types/locationTypes";
// All airport related utility functions

/**
 * @description Creates a new Airport in a User's list. The airport must be unique per user, meaning
 * an ICAO code can only be stored once per User.
 *
 * @param {string} icaoCode The ICAO code of the Airport. Must be 4 uppercase letters.
 * @param {string} name The name of the Airport. Must be title case.
 *
 * @returns {Promise<Airport | null>} The new Airport or null after resolution of the request.
 */
export const createAirport = async (
  icaoCode: string,
  name: string
): Promise<Airport | null> => {
  try {
    const response: AxiosResponse = await api.post("airports/", {
      icao_code: icaoCode,
      name: name,
    });
    if (response.status === 201) {
      const newAirport: Airport = {
        icaoCode: response.data["icao_code"],
        name: response.data["name"],
      };
      return newAirport;
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
 * @description Gets all of a User's stored Airports.
 *
 * @returns {Promise<Airport[] | null>} The Airport array or null after resolution of the request.
 */
export const getAllAirports = async (): Promise<Airport[] | null> => {
  const response: AxiosResponse = await api.get("airports/");
  if (response.status === 200) {
    const userAirportsArr: Airport[] = [];
    for (const elem of response.data) {
      const airport: Airport = {
        icaoCode: elem["icao_code"],
        name: elem["name"],
      };
      userAirportsArr.push(airport);
    }
    return userAirportsArr;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * @description Gets a User's specific stored Airport. 
 *
 * @param {string} icaoCode The ICAO code of the Airport.
 *
 * @returns {Promise<Airport | null>} The Airport or null after resolution of the request.
 */
export const getAnAirport = async (
  icaoCode: string
): Promise<Airport | null> => {
  const response: AxiosResponse = await api.get(`airports/${icaoCode}/`);
  if (response.status === 200) {
    const airport: Airport = {
      icaoCode: response.data["icao_code"],
      name: response.data["name"],
    };
    return airport;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * @description Updates an Airport's ICAO code and name. Airport must be unique to the User, meaning
 * one ICAO code can only be stored once per User.
 *
 * @param {string} currIcaoCode The Airport's current ICAO code.
 * @param {string} [newIcaoCode] An optional new ICAO code. Must be 4 uppercase letters.
 * @param {string} [newName] An optional new name.
 *
 * @returns {Promise<Airport | null>} The updated Airport or null after resolution of the request.
 */
export const updateAnAirport = async (
  currIcaoCode: string,
  newIcaoCode?: string,
  newName?: string
): Promise<Airport | null> => {
  const newAirportData: { icao_code?: string; name?: string } = {};
  newIcaoCode !== "" && newIcaoCode
    ? (newAirportData["icao_code"] = newIcaoCode)
    : null;
  newName !== "" && newName ? (newAirportData["name"] = newName) : null;
  try {
    const response: AxiosResponse = await api.put(
      `airports/${currIcaoCode}/`,
      newAirportData
    );
    if (response.status === 200) {
      const updatedAirport: Airport = {
        icaoCode: response.data["icao_code"],
        name: response.data["name"],
      };
      return updatedAirport;
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
 * @description Deletes an Airport from a User's stored Airports.
 *
 * @param {string} icaoCode The ICAO code of the Airport.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
 */
export const deleteAnAirport = async (icaoCode: string): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(`airports/${icaoCode}/`);
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
