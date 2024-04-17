import { ReactElement } from "react";
import Button from "react-bootstrap/Button";
import { TafDisplayProps } from "../../../types/weatherTypes";

/**
 * @prop {string} taf The current TAF.
 * @prop {function} clearTaf A function that clears the current TAF.
 * 
 * @returns {ReactElement} TAF portion of WeatherDisplay.
 */
const TafDisplay: React.FC<TafDisplayProps> = ({
  taf,
  clearTaf,
}): ReactElement => (
  <div className="d-flex justify-content-between align-items-center">
    <span className="mr-2">{taf}</span>
    <Button variant="outline-danger" onClick={clearTaf} size="sm">
      Clear
    </Button>
  </div>
);

export default TafDisplay;
