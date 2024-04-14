import { useState, ReactElement, useEffect } from "react";
import { useWeather, WeatherContextType } from "../../hooks/weatherContext";
import {
  getAirportMetars,
  getNamedLocationMetar,
} from "../../utilities/weatherDataUtilities";
import "./workflow.css";

const WeatherDisplay: React.FC = (): ReactElement => {
  const { icaoCode, latitude, longitude }: WeatherContextType = useWeather();
  const [metar, setMetar] = useState<string | null>(null);
  const [taf, setTaf] = useState<string | null>(null);

  /**
   * Handler that will get called in useEffect when named location is set in context
   * @param latitude
   * @param longitude
   */
  const handleLocationUpdate = async (
    latitude: string,
    longitude: string
  ): Promise<void> => {
    const newMetar: string | null = await getNamedLocationMetar(
      latitude,
      longitude
    );
    if (newMetar) {
      setMetar(newMetar);
    }
  };

  /**
   * useEffect to grab metar for a named location upon context update
   */
  useEffect(() => {
    if (latitude && longitude) {
      handleLocationUpdate(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleAirportUpdate = async (icaoCode: string): Promise<void> => {
    const newMetar: string | null = await getAirportMetars(icaoCode);
    if (newMetar) {
      setMetar(newMetar);
    }
  };

  useEffect(() => {
    if (icaoCode) {
      handleAirportUpdate(icaoCode);
    }
  }, [icaoCode]);

  return (
    <>
      <h4>Weather</h4>
      <div className="console">
        {metar ? <span>{metar}</span> : null}
        {taf ? <span>{taf}</span> : null}
      </div>
    </>
  );
};

export default WeatherDisplay;
