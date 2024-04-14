import { useState, ReactElement, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useWeather, WeatherContextType } from "../../hooks/weatherContext";
import {
  getAirportMetars,
  getAirportTafs,
  getNamedLocationMetar,
  getNamedLocationTaf,
} from "../../utilities/weatherDataUtilities";
import "../../styles/workflow.css";

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
    if (newMetar) {
      setMetar(newMetar);
    }
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
    if (newMetar) {
      setMetar(newMetar);
    }
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
    if (newTaf) {
      setTaf(newTaf);
    }
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
    if (newTaf) {
      setTaf(newTaf);
    }
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
            <div className="d-flex justify-content-between align-items-center">
              <span className="mr-2">{metar}</span>
              <Button
                variant="outline-danger"
                onClick={() => setMetar(null)}
                size="sm"
              >
                Clear
              </Button>
            </div>
          ) : null}
          {taf ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className="mr-2">{taf}</span>
              <Button
                variant="outline-danger"
                onClick={() => setTaf(null)}
                size="sm"
              >
                Clear
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default WeatherDisplay;
