import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { Flight } from "../../types/flightTypes";
// All flight crud utilities

/**
 * @description Creates a new Flight for a User. tailNumber, aircraftTypeModel, and takeoffTime must be unique
 * together.
 *
 * @param {number} tailNumber The tail number of the aircraft. It must be between 100 & 999.
 * @param {string} callsign The callsign of the flight. It must be uppercase, start with letters, only end in 1-3 digits.
 * @param {string} aircraftTypeModel The aircraft type and model. It must be uppercase and contain only letters, digit, and hyphens.
 * @param {string} pilotResponsible The pilot responsible for receiving the brief for the flight, must be in title case.
 * @param {string} origin The origin airport. Must be a valid ICAO code.
 * @param {string} destination The destination airport. Must be a valid ICAO code.
 * @param {number} flightLevel The aircraft's flight level during the flight.
 * @param {string} takeoffTime The takeoff time for the flight. Must be in YYYY-MM-DDTHH:MM:SSZ
 * @param {string} arrivalTime The arrival time for the flight. Musst be in YYYY-MM-DDTHH:MM:SSZ
 *
 * @returns {Promise<Flight | null>} The new Flight or null after resolution of the request.
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
 * @description Gets all of a User's stored flights.
 *
 * @returns {Promise<Flight[] | null>} The array of Flights or null after resolution of the request.
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
 * @description Grabs a User's specific Flight.
 *
 * @param {number} flightId The Flight's id.
 *
 * @returns {Promise<Flight | null>} The Flight or null after resolution of the request.
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
      destination: response.data["destination"],
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
 * @description Updates a Flight's details
 *
 * @param {number} flightId The Flight's id
 * @param {number} [newTailNumber] An optional new tail number. Must be between 100-999
 * @param {string} [newCallsign] An optional new callsign. Must be uppercase and end with 1-3 digits.
 * @param {string} [newAircraftTypeModel] An optional new aircraft type and model. Must by uppercase and can only contain letters, digits, and numbers.
 * @param {string} [newPilotResponsible] An optional new pilot responsible. Must be title case.
 * @param {string} [newOrigin] An optional new origin airport. Must be a valid ICAO code.
 * @param {string} [newDestination] An optional new destination airport. Must be a valid ICAO code.
 * @param {number} [newFlightLevel] An optional new flight level.
 * @param {string} [newTakeoffTime] An optional new takeoff time. Must be in format YYYY-MM-DDTHH:MM:SSZ.
 * @param {string} [newArrivalTime] An optional new arrival time. Must be in format YYYY-MM-DDTHH:MM:SSZ.
 *
 * @returns {Promise<Flight | null>} The updated Flight or null after resolution of the request.
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
 * @description Deletes a User's specified Flight.
 *
 * @param {number} flightId The Flight's id.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
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
