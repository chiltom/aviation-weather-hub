/**
 * The Brief interface defines the properties of a brief, which consist of:
 * - Brief id
 * - Parent flight id
 * - Surface winds
 * - Flight level winds
 * - Visibility
 * - Sky condition
 * - Temperature
 * - Altimeter setting
 * - Brief time
 * - Void time
 * - An array of hazards associated with the brief
 */
export interface Brief {
  id: number;
  flight: number;
  surfaceWinds: string;
  flightLevelWinds: string;
  visibility: string;
  skyCondition: string;
  temperature: string;
  altimeterSetting: string;
  briefTime: string;
  voidTime: string;
  hazards: Hazard[];
}

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
 * The Hazard interface defines the properties of a hazard, which consist of:
 * - Hazard id
 * - Parent brief's id
 * - The type of hazard
 * - The information pertaining to the hazard
 */
export interface Hazard {
  id: number;
  brief: number;
  type: string;
  information: string;
}
