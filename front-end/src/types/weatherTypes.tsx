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
