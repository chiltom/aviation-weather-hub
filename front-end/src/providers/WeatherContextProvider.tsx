import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { WeatherContextType } from "../types/weatherTypes";

/**
 * A variable that holds the context with the initial value being undefined
 * but asserts the type that the incoming hook must be.
 *
 * This means that if the context falls outside of the WeatherContext.Provider
 * tree, it will be undefined. If it falls within the provider, however, the context
 * can be used within the useWeather hook.
 */
const WeatherContext: React.Context<WeatherContextType | undefined> =
  createContext<WeatherContextType | undefined>(undefined);

/**
 * Creates a custom hook to use the context within the provider, allowing any
 * component within the weather provider to use the useWeather hook with all
 * associated state and setters.
 *
 * Any component that does not fall within the WeatherContext.Provider below
 * that tries to access this hook will throw the error below.
 */
export const useWeather = (): WeatherContextType => {
  const context: WeatherContextType | undefined = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

/**
 * The provider component that will provide WeatherContext and all of its
 * associated state and setters to child components within its scope.
 */
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const [metarIcaoCode, setMetarIcaoCode] = useState<string | null>(null);
  const [metarLatitude, setMetarLatitude] = useState<string | null>(null);
  const [metarLongitude, setMetarLongitude] = useState<string | null>(null);
  const [tafIcaoCode, setTafIcaoCode] = useState<string | null>(null);
  const [tafLatitude, setTafLatitude] = useState<string | null>(null);
  const [tafLongitude, setTafLongitude] = useState<string | null>(null);

  // Provides the state and updater functions to all context consumers
  const value = {
    metarIcaoCode,
    setMetarIcaoCode,
    metarLatitude,
    setMetarLatitude,
    metarLongitude,
    setMetarLongitude,
    tafIcaoCode,
    setTafIcaoCode,
    tafLatitude,
    setTafLatitude,
    tafLongitude,
    setTafLongitude,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
