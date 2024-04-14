/**
 * The Airport interface defines the properties of an Airport,
 * which consist of an icaoCode and name, effectively holding
 * all relevant Airport information from the server
 */
export interface Airport {
  icaoCode: string;
  name: string;
}

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
