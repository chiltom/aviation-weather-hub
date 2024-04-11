import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
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
        latitude: infoResponse.data["latitude"],
        longitude: infoResponse.data["longitude"],
      };
      const creationResponse: AxiosResponse = await api.post(
        `named-locations/`,
        namedLocation
      );
      if (creationResponse.status === 200) {
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
    console.log(response.data);
    return null;
  }
};
