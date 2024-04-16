import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { NamedLocation } from "../../types/locationTypes";
// All named location related utility functions

/**
 * @description Creates a new NamedLocation for a User. NamedLocation must be unique per User, meaning
 * that one set of coordinates can be stored can only be stored once per User.
 * The coordinates are provided by the Geocoding API from OpenWeather.
 *
 * @param {string} city The city name.
 * @param {string} country The two-letter country abbreviation.
 *
 * @returns {Promise<NamedLocation | null>} The new NamedLocation or null after resolution of the request.
 */
export const createNamedLocation = async (
  city: string,
  country: string
): Promise<NamedLocation | null> => {
  try {
    const infoResponse: AxiosResponse = await api.get(
      `coordinates/city/${city}/country/${country}/`
    );
    if (infoResponse.status === 200) {
      const namedLocation: NamedLocation = {
        city: infoResponse.data["city"],
        country: infoResponse.data["country"],
        latitude: String(infoResponse.data["latitude"]),
        longitude: String(infoResponse.data["longitude"]),
      };
      const creationResponse: AxiosResponse = await api.post(
        `named-locations/`,
        namedLocation
      );
      if (creationResponse.status === 201) {
        return namedLocation;
      } else {
        console.log("Creation error: ", creationResponse.data);
        return null;
      }
    } else {
      console.log("Information grab error: ", infoResponse.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * @description Gets all of a User's stored NamedLocations.
 *
 * @returns {Promise<NamedLocation[] | null>} The array of NamedLocations or null after resolution of the request.
 */
export const getAllNamedLocations = async (): Promise<
  NamedLocation[] | null
> => {
  const response: AxiosResponse = await api.get("named-locations/");
  if (response.status === 200) {
    const userNamedLocationsArr: NamedLocation[] = [];
    for (const elem of response.data) {
      const named_location: NamedLocation = {
        city: elem["city"],
        country: elem["country"],
        latitude: elem["latitude"],
        longitude: elem["longitude"],
      };
      userNamedLocationsArr.push(named_location);
    }
    return userNamedLocationsArr;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * @description Gets a User's specified NamedLocation.
 *
 * @param {string} city The city name.
 *
 * @returns {Promise<NamedLocation | null>} The NamedLocation or null after resolution of the request.
 */
export const getANamedLocation = async (
  city: string
): Promise<NamedLocation | null> => {
  const response: AxiosResponse = await api.get(`named-locations/${city}/`);
  if (response.status === 200) {
    const namedLocation: NamedLocation = {
      city: response.data["city"],
      country: response.data["country"],
      latitude: response.data["latitude"],
      longitude: response.data["longitude"],
    };
    return namedLocation;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * @description Updates a NamedLocations city name and country abbreviation. Coordinates must be unique to User.
 *
 * @param {string} currCity The current city name.
 * @param {string} currCountry The current two-letter country abbreviation.
 * @param {string} [newCity] An optional new city name.
 * @param {string} [newCountry] An optional new country abbreviation.
 *
 * @returns {Promise<NamedLocation | null>} The updated NamedLocation or null after resolution of the request.
 */
export const updateANamedLocation = async (
  currCity: string,
  currCountry: string,
  newCity?: string,
  newCountry?: string
): Promise<NamedLocation | null> => {
  const newNamedLocationData: { city?: string; country?: string } = {};
  newCity !== "" && newCity !== undefined
    ? (newNamedLocationData["city"] = newCity)
    : (newNamedLocationData["city"] = currCity);
  newCountry !== "" && newCountry !== undefined
    ? (newNamedLocationData["country"] = newCountry)
    : (newNamedLocationData["country"] = currCountry);
  try {
    const infoResponse: AxiosResponse = await api.get(
      `coordinates/city/${newNamedLocationData["city"]}/country/${newNamedLocationData["country"]}/`
    );
    if (infoResponse.status === 200) {
      const namedLocation: NamedLocation = {
        city: infoResponse.data["city"],
        country: infoResponse.data["country"],
        latitude: String(infoResponse.data["latitude"]),
        longitude: String(infoResponse.data["longitude"]),
      };
      const updateResponse: AxiosResponse = await api.put(
        `named-locations/${currCity}/`,
        namedLocation
      );
      if (updateResponse.status === 200) {
        return namedLocation;
      } else {
        console.log("Put request failed: ", updateResponse.data);
        return null;
      }
    } else {
      console.log("Information grab error: ", infoResponse.data);
      return null;
    }
  } catch (error) {
    console.log("Error making request: ", error);
    return null;
  }
};

/**
 * @description Deletes a User's NamedLocation.
 *
 * @param {string} city The city name.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
 */
export const deleteANamedLocation = async (city: string): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(`named-locations/${city}/`);
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion error: ", response.data);
    return false;
  }
};
