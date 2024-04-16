import { api } from "./axiosConfig";
import { AxiosResponse } from "axios";
// All weather data related utility functions

/**
 * @description Grabs the latest METAR for the specified airport.
 *
 * @param {string} icaoCode ICAO code of the airport.
 *
 * @returns {Promise<string | null>} The METAR or null after resolution of the request.
 */
export const getAirportMetars = async (
  icaoCode: string
): Promise<string | null> => {
  try {
    const formattedCode: string = icaoCode.replace(/ /g, "");
    const response: AxiosResponse = await api.get(
      `metars/airports/${formattedCode}/`
    );
    if (response.status === 200) {
      return response.data[icaoCode];
    } else {
      console.log("Get request failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Grabs the latest METAR for the closest station to a named location.
 *
 * @param {string} latitude The latitude of the location.
 * @param {string} longitude The longitude of the location.
 *
 * @returns {Promise<string | null>} The METAR or null after resolution of the request.
 */
export const getNamedLocationMetar = async (
  latitude: string,
  longitude: string
): Promise<string | null> => {
  try {
    const response: AxiosResponse = await api.get(
      `metars/lat/${latitude}/lon/${longitude}/`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Get request failed: ", response.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * @description Grabs the latest TAF for the specified airport.
 *
 * @param {string} icaoCode - ICAO code of the airport.
 *
 * @returns {Promise<string | null>} The TAF or null after resolution of the request.
 */
export const getAirportTafs = async (
  icaoCode: string
): Promise<string | null> => {
  const formattedCode: string = icaoCode.replace(/ /g, "");
  try {
    const response: AxiosResponse = await api.get(
      `tafs/airports/${formattedCode}/`
    );
    if (response.status === 200) {
      return response.data[icaoCode];
    } else {
      console.log("Get request failed: ", response.data);
      return null;
    }
  } catch (error) {
    return null;
  }
};

/**
 * @description Grabs the latest TAF from the closest station to a named location.
 *
 * @param {string} latitude The latitude of the location.
 * @param {string} longitude The longitude of the location.
 *
 * @returns {Promise<string | null>} The TAF or null after resolution of the request.
 */
export const getNamedLocationTaf = async (
  latitude: string,
  longitude: string
): Promise<string | null> => {
  try {
    const response: AxiosResponse = await api.get(
      `tafs/lat/${latitude}/lon/${longitude}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Get request failed: ", response.data);
      return null;
    }
  } catch (error) {
    return null;
  }
};
