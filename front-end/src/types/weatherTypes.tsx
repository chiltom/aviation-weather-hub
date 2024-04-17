/**
 * @description Interface to pass down props from WeatherDisplay component
 * to child MetarDisplay component.
 *
 * @prop {string | null} metar - The metar state.
 * @prop {function: void} clearMetar - Clears the metar state.
 */
export interface MetarDisplayProps {
  metar: string | null;
  clearMetar: () => void;
}

/**
 * @description Interface to pass down props from WeatherDisplay component
 * to child TafDisplay component.
 *
 * @prop {string | null} taf - The taf state.
 * @prop {function: void} clearTaf - Clears the taf state.
 */
export interface TafDisplayProps {
  taf: string | null;
  clearTaf: () => void;
}

/**
 * @description Defines the context type for the weather provider, which consists
 * of all necessary state and setters for the various methods needed to gather weather
 * data.
 *
 * @prop {string | null} metarIcaoCode - The metarIcaoCode state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setMetarIcaoCode - The metarIcaoCode setter.
 * @prop {string | null} metarLatitude - The metarLatitude state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setMetarLatitude - The metarLatitude setter.
 * @prop {string | null} metarLongitude - The metarLongitude state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setMetarLongitude - The metarLongitude setter.
 * @prop {string | null} tafIcaoCode - The tafIcaoCode state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setTafIcaoCode - The tafIcaoCode setter.
 * @prop {string | null} tafLatitude - The tafLatitude state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setTafLatitude - The tafLatitude setter.
 * @prop {string | null} tafLongitude - The tafLongitude state.
 * @prop {React.Dispatch<React.SetStateAction<string | null>>} setTafLongitude - The tafLongitude setter.
 */
export interface WeatherContextType {
  metarIcaoCode: string | null;
  setMetarIcaoCode: React.Dispatch<React.SetStateAction<string | null>>;
  metarLatitude: string | null;
  setMetarLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  metarLongitude: string | null;
  setMetarLongitude: React.Dispatch<React.SetStateAction<string | null>>;
  tafIcaoCode: string | null;
  setTafIcaoCode: React.Dispatch<React.SetStateAction<string | null>>;
  tafLatitude: string | null;
  setTafLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  tafLongitude: string | null;
  setTafLongitude: React.Dispatch<React.SetStateAction<string | null>>;
}
