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

/**
 * @description Maps out the current METAR or TAF to a console display that
 * presents the information in a normalized format.
 *
 * @returns {ReactElement} Console that displays METAR and TAF data for the
 * specified Airport or NamedLocation.
 */
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
   * @description Handler that fetches a NamedLocation's METAR when set in context.
   *
   * @param {string} latitude The latitude of the NamedLocation.
   * @param {string} longitude The longitude of the NamedLocation.
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
   * Calls the handleMetarLocationUpdate function when the metarLatitude and
   * metarLongitude states change.
   */
  useEffect(() => {
    if (metarLatitude && metarLongitude) {
      handleMetarLocationUpdate(metarLatitude, metarLongitude);
      setMetarLatitude(null);
      setMetarLongitude(null);
    }
  }, [metarLatitude, metarLongitude]);

  /**
   * @description Handler that fetches an Airport's METAR when set in context.
   *
   * @param {string} icaoCode The Airport's ICAO code.
   */
  const handleMetarAirportUpdate = async (icaoCode: string): Promise<void> => {
    const newMetar: string | null = await getAirportMetars(icaoCode);
    newMetar
      ? setMetar(newMetar)
      : alert("Unable to grab a METAR for that air station.");
  };

  /**
   * Calls the handleMetarAirportUpdate function when the metarIcaoCode state changes.
   */
  useEffect(() => {
    if (metarIcaoCode) {
      handleMetarAirportUpdate(metarIcaoCode);
      setMetarIcaoCode(null);
    }
  }, [metarIcaoCode]);

  /**
   * @description Handler that fetches a NamedLocation's TAF when set in context.
   *
   * @param {string} latitude The latitude of the NamedLocation.
   * @param {string} longitude The longitude of the NamedLocation.
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
   * Calls the handleTafNamedLocationUpdate function when the tafLatitude and
   * tafLongitude states change.
   */
  useEffect(() => {
    if (tafLatitude && tafLongitude) {
      handleTafNamedLocationUpdate(tafLatitude, tafLongitude);
      setTafLatitude(null);
      setTafLongitude(null);
    }
  }, [tafLatitude, tafLongitude]);

  /**
   * @description Handler that fetches an Airport's TAF when set in context.
   *
   * @param {string} icaoCode The Airport's ICAO code.
   */
  const handleTafAirportUpdate = async (icaoCode: string): Promise<void> => {
    const newTaf: string | null = await getAirportTafs(icaoCode);
    newTaf
      ? setTaf(newTaf)
      : alert("Unable to grab a METAR for that air station.");
  };

  /**
   * Calls the handleTafAirportUpdate function when the tafIcaoCode state changes.
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
