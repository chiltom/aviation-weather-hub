/**
 * @description The Brief interface defines the properties of a brief.
 *
 * @property {number} id - Brief's id.
 * @property {number} flight - Parent Flight's id.
 * @property {string} surfaceWinds - Winds at surface level.
 * @property {string} flightLevelWinds - Winds at Flight level.
 * @property {string} visibility - Visibility at surface.
 * @property {string} skyCondition - Sky condition
 * @property {string} temperature - Temperature in Celsius
 * @property {string} altimeterSetting - Altimeter setting of aircraft.
 * @property {string} briefTime - Brief time in YYYY-MM-DDTHH:MM:SSZ format.
 * @property {string} voidTime - Void time in YYYY-MM-DDTHH:MM:SSZ format.
 * @property {Hazard[]} hazards -  An array of hazards associated with the brief.
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
 * @description The Flight interface defines the properties of a flight.
 *
 * @property {number} id - Flight's id.
 * @property {number} tailNumber - Aircraft tail number.
 * @property {string} callsign - Aircraft callsign.
 * @property {string} aircraftTypeModel - Aircraft type and model.
 * @property {string} pilotResponsible - Pilot responsible for the flight and receiving weather briefs.
 * @property {string} origin - Origin Airport's ICAO code. Must be stored in the User's Airport[].
 * @property {string} destination - Destination Airport's ICAO code. Must be stored in the User's Airport[].
 * @property {number} flightLevel - The flight level of the aircraft.
 * @property {string} takeoffTime - The takeoff time of the flight in YYYY-MM-DDTHH:MM:SSZ format.
 * @property {string} arrivalTime - The arrival time of the flight in YYYY-MM-DDTHH:MM:SSZ format.
 * @property {Brief[]} briefs - An array of briefs associated with the flight.
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
 * @description The Hazard interface defines the properties of a hazard.
 *
 * @property {number} id - Hazard's id.
 * @property {number} brief - Parent brief's id.
 * @property {string} type - The type of hazard.
 * @property {string} information - The information pertaining to the hazard.
 */
export interface Hazard {
  id: number;
  brief: number;
  type: string;
  information: string;
}
