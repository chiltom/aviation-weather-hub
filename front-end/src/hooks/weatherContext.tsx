import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";

/**
 * Defines the type for the context, which consists of an icaoCode and a
 * state setter for the icaoCode.
 */
export interface WeatherContextType {
  icaoCode: string | null;
  setIcaoCode: React.Dispatch<React.SetStateAction<string | null>>;
  latitude: string | null;
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  longitude: string | null;
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * A variable that holds the context with the initial value being undefined
 * but asserts the type that the incoming hook must be.
 */
const WeatherContext: React.Context<WeatherContextType | undefined> =
  createContext<WeatherContextType | undefined>(undefined);

/**
 * Creates a custom hook to use the context within the provider, allowing any
 * component within the weather provider to use the useWeather hook.
 */
export const useWeather = (): WeatherContextType => {
  const context: WeatherContextType | undefined = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

/**
 * The provider component that will be used in other components.
 */
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const [icaoCode, setIcaoCode] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  // Provides the state and updater function to all context consumers
  const value = {
    icaoCode,
    setIcaoCode,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
