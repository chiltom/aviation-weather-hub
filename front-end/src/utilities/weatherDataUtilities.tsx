import { api } from "./axiosConfig";
import { AxiosResponse } from "axios";
// All weather data related utility functions

/**
 * This function takes an icao code string as its parameter and makes a get
 * request to the server endpoint to grab the METARs for those airports. The
 * METARs are provided by the CheckWX API.
 *
 * If the request is successful, the response provided by the server is returned.
 *
 * If the request is unsuccessful, the error is printed to the console and
 * null is returned.
 * @param icaoCodes String of icao codes separated by commas with no spaces in between
 */
export const getAirportMetars = async (
  icaoCodes: string
): Promise<object | null> => {
  const formattedCodes: string = icaoCodes.replace(/ /g, "");
  const response: AxiosResponse = await api.get(
    `metars/airports/${formattedCodes}/`
  );
  if (response.status === 200) {
    // Use for (const [key, value] of Object.entries(response)) to grab
    // metars from this returned object and display them in the component
    return response.data;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a named location's latitude and longitude and makes a
 * get request to the server endpoint to grab the METAR from the closest radar
 * to that location. The METAR is provided by the CheckWX API.
 *
 * If the request is successful, the response from the server is returned.
 *
 * If the request is unsuccessful, the error is printed to the console and null
 * is returned.
 * @param latitude
 * @param longitude
 */
export const getNamedLocationMetar = async (
  latitude: string,
  longitude: string
): Promise<object | null> => {
  const response: AxiosResponse = await api.get(
    `metars/lat/${latitude}/lon/${longitude}/`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a string of icao codes separated by commas with no spaces
 * as its parameter and makes a get request to the server endpoint to return all
 * air station TAFs. The TAFs are provided by the CheckWX API.
 *
 * If the request is successful, the response from the server is returned.
 *
 * If the request is unsuccessful, the error is printed to the console and null
 * is returned.
 * @param icaoCodes
 */
export const getAirportTafs = async (
  icaoCodes: string
): Promise<object | null> => {
  const formattedCodes: string = icaoCodes.replace(/ /g, "");
  const response: AxiosResponse = await api.get(
    `tafs/airports/${formattedCodes}/`
  );
  if (response.status === 200) {
    // Use for (const [key, value] of Object.entries(response)) to grab
    // metars from this returned object and display them in the component
    return response.data;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a named location's latitude and longitude and makes a
 * get request to the server endpoint to grab the TAF from the closest radar
 * to that location. The TAF is provided by the CheckWX API.
 *
 * If the request is successful, the response from the server is returned.
 *
 * If the request is unsuccessful, the error is printed to the console and null
 * is returned.
 * @param latitude
 * @param longitude
 */
export const getNamedLocationTaf = async (
  latitude: string,
  longitude: string
): Promise<object | null> => {
  const response: AxiosResponse = await api.get(
    `tafs/lat/${latitude}/lon/${longitude}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};
