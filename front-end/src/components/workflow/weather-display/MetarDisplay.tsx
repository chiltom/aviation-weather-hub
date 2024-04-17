import { ReactElement } from "react";
import Button from "react-bootstrap/Button";
import { MetarDisplayProps } from "../../../types/weatherTypes";

/**
 * @prop {string} metar The current METAR.
 * @prop {function} clearMetar A function that clears the current METAR.
 * 
 * @returns {ReactElement} METAR portion of WeatherDisplay.
 */
const MetarDisplay: React.FC<MetarDisplayProps> = ({
  metar,
  clearMetar,
}): ReactElement => (
  <div className="d-flex justify-content-between align-items-center">
    <span className="mr-2">{metar}</span>
    <Button variant="outline-danger" onClick={clearMetar} size="sm">
      Clear
    </Button>
  </div>
);

export default MetarDisplay;
