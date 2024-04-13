import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
// All named location related utility functions

/**
 * The NamedLocation interface defines the properties of a named location,
 * which consist of the city's name, the two-letter country abbreviation,
 * and the latitude and longitude of the location which make up its
 * coordinates.
 *
 * A NamedLocation object will hold all relevant information for the
 * location
 */
export interface NamedLocation {
  city: string;
  country: string;
  latitude: string;
  longitude: string;
}

/**
 * This function takes a city name and country abbreviation and creates
 * a new named location for the user.
 *
 * The function first takes the two parameters and makes a get request to
 * the server endpoint to get the latitude and longitude of the location.
 * NOTE: The server gets this data using the Geocoding API provided by OpenWeather.
 * If the city name and country abbreviation are valid, the API returns the
 * latitude and longitude.
 *
 * The information, if valid, is then used to make a post request to the server
 * endpoint to create the named location for the user in the database.
 *
 * If the parameters are a valid location and the location is created for the
 * user, the NamedLocation object is returned.
 *
 * If the information is invalid, null is returned.
 * @param city
 * @param country
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
 * This function takes no parameters and grabs all of the user's
 * named locations from storage. The array returned from the server is
 * then iterated over and each element is destructured into a NamedLocation
 * object.
 *
 * Finally, the array of NamedLocation objects is returned.
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
 * This function takes a city's name as the parameter and makes a get request to
 * the server endpoint with the parameter attached to the url.
 *
 * If the named location exists for the user in the database, the server will
 * return the named location's data and the function will return a NamedLocation
 * object.
 *
 * If the named location does not exist, the function returns null.
 * @param city
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
 * This function takes a current location's name and country as parameters and
 * also takes a new city name and new country abbreviation as optional parameters.
 * It then filters through the parameters and grabs the optional parameters if they
 * are inlcuded.
 *
 * After grabbing all of the parameters, it makes a request to the server endpoint
 * to grab a new latitude and longitude from the Geocoding API.
 * - If this is successful, a new NamedLocation object is created.
 * - If this is unsuccessful, it returns null and prints the information grab error
 *  to the console.
 *
 * If the new NamedLocation object is created, it is sent to the proper server
 * endpoint with a put request and attempts to update the database's stored record
 * of the named location.
 * - If this is successful, the NamedLocation object is returned.
 * - If this is unsuccessful, the update error is printed to the console and null
 * is returned.
 * @param currCity
 * @param currCountry
 * @param newCity
 * @param newCountry
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
 * This function takes a location's city name as its parameter and makes a
 * delete request to the server endpoint to delete the specified airport.
 *
 * If the request was successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param city
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
