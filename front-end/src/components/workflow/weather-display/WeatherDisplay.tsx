import { useState, ReactElement, useEffect } from "react";
import { useWeather } from "../../../providers/WeatherContextProvider";
import { WeatherContextType } from "../../../types/weatherTypes";
import {
  getAirportMetars,
  getAirportTafs,
  getNamedLocationMetar,
  getNamedLocationTaf,
} from "../../../utilities/weatherDataUtilities";
import "../../../styles/workflow.css";
import MetarDisplay from "./MetarDisplay";
import TafDisplay from "./TafDisplay";

const WeatherDisplay: React.FC = (): ReactElement => {
  const {
    metarIcaoCode,
    metarLatitude,
    metarLongitude,
    tafIcaoCode,
    tafLatitude,
    tafLongitude,
    setMetarIcaoCode,
    setMetarLatitude,
    setMetarLongitude,
    setTafIcaoCode,
    setTafLatitude,
    setTafLongitude,
  }: WeatherContextType = useWeather();
  const [metar, setMetar] = useState<string | null>(null);
  const [taf, setTaf] = useState<string | null>(null);

  /**
   * Handler that will get called in useEffect when named location METAR is set in context.
   * @param latitude
   * @param longitude
   */
  const handleMetarLocationUpdate = async (
    latitude: string,
    longitude: string
  ): Promise<void> => {
    const newMetar: string | null = await getNamedLocationMetar(
      latitude,
      longitude
    );
    newMetar
      ? setMetar(newMetar)
      : alert(
          "That location doesn't have any nearby air stations providing METARs right now."
        );
  };

  /**
   * useEffect to grab METAR for a named location upon context update.
   */
  useEffect(() => {
    if (metarLatitude && metarLongitude) {
      handleMetarLocationUpdate(metarLatitude, metarLongitude);
      setMetarLatitude(null);
      setMetarLongitude(null);
    }
  }, [metarLatitude, metarLongitude]);

  /**
   * Handler that will get called in useEffect when airport METAR is set in context
   * @param icaoCode
   */
  const handleMetarAirportUpdate = async (icaoCode: string): Promise<void> => {
    const newMetar: string | null = await getAirportMetars(icaoCode);
    newMetar
      ? setMetar(newMetar)
      : alert("Unable to grab a METAR for that air station.");
  };

  /**
   * useEffect that will call handler for airport METAR upon context update.
   */
  useEffect(() => {
    if (metarIcaoCode) {
      handleMetarAirportUpdate(metarIcaoCode);
      setMetarIcaoCode(null);
    }
  }, [metarIcaoCode]);

  /**
   * Handler that is called in useEffect when context changes for named location taf
   * updates.
   * @param latitude
   * @param longitude
   */
  const handleTafNamedLocationUpdate = async (
    latitude: string,
    longitude: string
  ): Promise<void> => {
    const newTaf: string | null = await getNamedLocationTaf(
      latitude,
      longitude
    );
    newTaf
      ? setTaf(newTaf)
      : alert(
          "That location doesn't have any nearby air stations providing TAFs right now."
        );
  };

  /**
   * useEffect that calls respective handler function when tafLatitude and tafLongitude
   * are set in context.
   */
  useEffect(() => {
    if (tafLatitude && tafLongitude) {
      handleTafNamedLocationUpdate(tafLatitude, tafLongitude);
      setTafLatitude(null);
      setTafLongitude(null);
    }
  }, [tafLatitude, tafLongitude]);

  /**
   * Handler that is called in useEffect when tafIcaoCode state is updated.
   * @param icaoCode
   */
  const handleTafAirportUpdate = async (icaoCode: string): Promise<void> => {
    const newTaf: string | null = await getAirportTafs(icaoCode);
    newTaf
      ? setTaf(newTaf)
      : alert("Unable to grab a METAR for that air station.");
  };

  /**
   * useEffect that calls respective handler function when tafLatitude and tafLongitude
   * are set in context.
   */
  useEffect(() => {
    if (tafIcaoCode) {
      handleTafAirportUpdate(tafIcaoCode);
      setTafIcaoCode(null);
    }
  }, [tafIcaoCode]);

  return (
    <>
      {metar || taf ? (
        <div className="console">
          {metar ? (
            <MetarDisplay metar={metar} clearMetar={() => setMetar(null)} />
          ) : null}
          {taf ? <TafDisplay taf={taf} clearTaf={() => setTaf(null)} /> : null}
        </div>
      ) : null}
    </>
  );
};

export default WeatherDisplay;