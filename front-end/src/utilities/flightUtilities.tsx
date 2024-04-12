import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
import { Brief } from "./briefUtilities";
// All flight crud utilities

/**
 * The Flight interface defines the properties of a flight, which consists
 * of:
 * - Flight id
 * - Aircraft tail number
 * - Callsign
 * - Aircraft type and model
 * - Pilot responsible for the flight and receiving weather briefs
 * - Origin airport's icao code
 * - Destination airport's icao code
 *  - Both of which must be in the user's stored airports or there will be
 *    an error trying to post the flight
 * - The flight level of the flight
 * - The takeoff time
 * - The arrival time
 * - An array of briefs associated with the flight.
 */
export interface Flight {
  id: number;
  tailNumber: number;
  callsign: string;
  aircraftTypeModel: string;
  pilotResponsible: string;
  origin: string;
  destination: string;
  flightLevel: number;
  takeoffTime: string;
  arrivalTime: string;
  briefs: Brief[];
}

/**
 * This function takes all of the required data for a flight record and makes
 * a post request to the server endpoint to create a new flight entry for the user.
 * By default, there are no associated briefs with a flight.
 *
 * If the arguments are valid and the flight is created in the database, the
 * server returns the data for the new flight and the function returns a
 * flight object.
 *
 * If the arguments are invalid, the error is printed to the console and null
 * is returned.
 * @param tailNumber
 * @param callsign
 * @param aircraftTypeModel
 * @param pilotResponsible
 * @param origin
 * @param destination
 * @param flightLevel
 * @param takeoffTime
 * @param arrivalTime
 */
export const createFlight = async (
  tailNumber: number,
  callsign: string,
  aircraftTypeModel: string,
  pilotResponsible: string,
  origin: string,
  destination: string,
  flightLevel: number,
  takeoffTime: string,
  arrivalTime: string
): Promise<Flight | null> => {
  try {
    const response: AxiosResponse = await api.post("flights/", {
      tail_number: tailNumber,
      callsign: callsign.toUpperCase(),
      aircraft_type_model: aircraftTypeModel.toUpperCase(),
      pilot_responsible: pilotResponsible,
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      flight_level: flightLevel,
      takeoff_time: takeoffTime,
      arrival_time: arrivalTime,
    });
    if (response.status === 201) {
      const newFlight: Flight = {
        id: response.data["id"],
        tailNumber: response.data["tail_number"],
        callsign: response.data["callsign"],
        aircraftTypeModel: response.data["aircraft_type_model"],
        pilotResponsible: response.data["pilot_responsible"],
        origin: response.data["origin"],
        destination: response.data["origin"],
        flightLevel: response.data["flight_level"],
        takeoffTime: response.data["takeoff_time"],
        arrivalTime: response.data["arrival_time"],
        briefs: response.data["briefs"],
      };
      return newFlight;
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
 * This function makes a get request to the server endpoint to grab an array
 * of all of the user's current flights.
 *
 * If an array of flights is returned from the server, the array is then iterated
 * over and each element is destructured into a Flight object.
 *
 * The destructured objects are all pushed to a Flight array that is returned.
 *
 * If the server returns an error, the error is printed to the console and
 * null is returned.
 */
export const getAllFlights = async (): Promise<Flight[] | null> => {
  const response: AxiosResponse = await api.get("flights/");
  if (response.status === 200) {
    const userFlights: Flight[] = [];
    for (const elem of response.data) {
      const flight: Flight = {
        id: elem["id"],
        tailNumber: elem["tail_number"],
        callsign: elem["callsign"],
        aircraftTypeModel: elem["aircraft_type_model"],
        pilotResponsible: elem["pilot_responsible"],
        origin: elem["origin"],
        destination: elem["destination"],
        flightLevel: elem["flight_level"],
        takeoffTime: elem["takeoff_time"],
        arrivalTime: elem["arrival_time"],
        briefs: elem["briefs"],
      };
      userFlights.push(flight);
    }
    return userFlights;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes a flight's id as the parameter and makes a get request
 * to the server endpoint with the flight id attached to the url.
 *
 * If the request is successful, the server returns the flight's info and the
 * function returns a Flight object.
 *
 * If the request fails, the error is printed to the console and null is returned.
 * @param flightId
 */
export const getAFlight = async (flightId: number): Promise<Flight | null> => {
  const response: AxiosResponse = await api.get(`flights/${flightId}/`);
  if (response.status === 200) {
    const flight: Flight = {
      id: response.data["id"],
      tailNumber: response.data["tail_number"],
      callsign: response.data["callsign"],
      aircraftTypeModel: response.data["aircraft_type_model"],
      pilotResponsible: response.data["pilot_responsible"],
      origin: response.data["origin"],
      destination: response.data["origin"],
      flightLevel: response.data["flight_level"],
      takeoffTime: response.data["takeoff_time"],
      arrivalTime: response.data["arrival_time"],
      briefs: response.data["briefs"],
    };
    return flight;
  } else {
    console.log("Get request failed: ", response.data);
    return null;
  }
};

/**
 * This function takes the current flight's id and the optional flight data
 * elements as parameters and sends a put request to the server endpoint to
 * update the brief with the new data.
 *
 * If the update is successful, the updated Flight object is returned.
 *
 * If the update is unsuccessful, the error is printed to the console and null
 * is returned.
 * @param flightId
 * @param newTailNumber
 * @param newCallsign
 * @param newAircraftTypeModel
 * @param newPilotResponsible
 * @param newOrigin
 * @param newDestination
 * @param newFlightLevel
 * @param newTakeoffTime
 * @param newArrivalTime
 */
export const updateAFlight = async (
  flightId: number,
  newTailNumber?: number,
  newCallsign?: string,
  newAircraftTypeModel?: string,
  newPilotResponsible?: string,
  newOrigin?: string,
  newDestination?: string,
  newFlightLevel?: number,
  newTakeoffTime?: string,
  newArrivalTime?: string
): Promise<Flight | null> => {
  const newData: {
    tail_number?: number;
    callsign?: string;
    aircraft_type_model?: string;
    pilot_responsible?: string;
    origin?: string;
    destination?: string;
    flight_level?: number;
    takeoff_time?: string;
    arrival_time?: string;
  } = {};
  newTailNumber !== 0 && newTailNumber
    ? (newData["tail_number"] = newTailNumber)
    : null;
  newCallsign !== "" && newCallsign
    ? (newData["callsign"] = newCallsign)
    : null;
  newAircraftTypeModel !== "" && newAircraftTypeModel
    ? (newData["aircraft_type_model"] = newAircraftTypeModel)
    : null;
  newPilotResponsible !== "" && newPilotResponsible
    ? (newData["pilot_responsible"] = newPilotResponsible)
    : null;
  newOrigin !== "" && newOrigin ? (newData["origin"] = newOrigin) : null;
  newDestination !== "" && newDestination
    ? (newData["destination"] = newDestination)
    : null;
  newFlightLevel !== 0 && newFlightLevel
    ? (newData["flight_level"] = newFlightLevel)
    : null;
  newTakeoffTime !== "" && newTakeoffTime
    ? (newData["takeoff_time"] = newTakeoffTime)
    : null;
  newArrivalTime !== "" && newArrivalTime
    ? (newData["arrival_time"] = newArrivalTime)
    : null;
  try {
    const response: AxiosResponse = await api.put(
      `flights/${flightId}/`,
      newData
    );
    if (response.status === 200) {
      const updatedFlight: Flight = {
        id: response.data["id"],
        tailNumber: response.data["tail_number"],
        callsign: response.data["callsign"],
        aircraftTypeModel: response.data["aircraft_type_model"],
        pilotResponsible: response.data["pilot_responsible"],
        origin: response.data["origin"],
        destination: response.data["origin"],
        flightLevel: response.data["flight_level"],
        takeoffTime: response.data["takeoff_time"],
        arrivalTime: response.data["arrival_time"],
        briefs: response.data["briefs"],
      };
      return updatedFlight;
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
 * This function takes a flight's id as its parameter and makes a delete request
 * to the server endpoint to delete the specified flight.
 *
 * If the request is successful, the function returns true.
 *
 * If the request was unsuccessful, the function returns false.
 * @param flightId
 */
export const deleteAFlight = async (flightId: number): Promise<boolean> => {
  const response: AxiosResponse = await api.delete(`flights/${flightId}/`);
  if (response.status === 204) {
    return true;
  } else {
    console.log("Deletion failed: ", response.data);
    return false;
  }
};
