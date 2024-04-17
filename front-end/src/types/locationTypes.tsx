/**
 * @description The Airport interface defines the properties of an Airport.
 *
 * @property {string} icaoCode - The Airport's ICAO code.
 * @property {string} name - The name of the Airport.
 */
export interface Airport {
  icaoCode: string;
  name: string;
}

/**
 * @description The NamedLocation interface defines the properties of a named location.
 *
 * @property {string} city - The city name.
 * @property {string} country - The two-letter country abbreviation.
 * @property {string} latitude - The latitude of the location.
 * @property {string} longitude - The longitude of the location.
 */
export interface NamedLocation {
  city: string;
  country: string;
  latitude: string;
  longitude: string;
}
