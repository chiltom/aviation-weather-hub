/**
 * Interface to pass down props from WeatherDisplay component to child Metar
 * Display component
 */
export interface MetarDisplayProps {
  metar: string | null;
  clearMetar: () => void;
}

/**
 * Interface to pass down props from WeatherDisplay component to child Taf
 * Display component
 */
export interface TafDisplayProps {
  taf: string | null;
  clearTaf: () => void;
}

/**
 * Defines the context type for the weather provider, which consists of all necessary
 * state and setters for the various methods needed to gather weather data.
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
