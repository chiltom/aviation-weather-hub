import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Airport } from "../../types/locationTypes";
// All airport related utility functions

/**
 * This function takes an icao_code and name for an airport as arguments
 * and sends a post request to the all_airports view with this data to the
 * api to create a new airport entry for a user.
 *
 * If the arguments are valid and the airport is created in the database,
 * the server returns the data for the new airport and the function
 * returns the new Airport object.
 *
 * @param icaoCode
 * @param name
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
 * This function makes a get request to the all_airports view to grab
 * an array of all of the user's current airports.
 *
 * If an array of airports is returned from the server, the array is then
 * iterated over and each element is destructured into a an Airport variable
 *
 * This variable is then pushed to the array and the airport array is finally
 * returned
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
 * This function takes an icao code argument and makes a get request to
 * the a_airport view with the parameter attached to the url.
 *
 * If the airport exists for the user in the database, the server will
 * return the airport's data and the function will return an Airport object.
 *
 * If the airport does not exist, the function returns null.
 * @param icaoCode
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
 * This function takes the current airport's icao code, an optional
 * new icao code, and an optional new name as parameters.
 *
 * If the parameters exist, a put request is made to the server to update
 * the information included in the body of the response
 *
 * If the update is successful, the updated airport is returned.
 *
 * If the update is unsuccessful, null is returned
 * @param currIcaoCode
 * @param newIcaoCode
 * @param newName
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
 * This function takes an airport icao code as its parameter and makes
 * a delete method call to the server to delete the specified airport.
 *
 * If the request was successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 *
 * @param icaoCode
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
