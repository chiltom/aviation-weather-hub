import { ReactElement } from "react";
import Button from "react-bootstrap/Button";
import { TafDisplayProps } from "../../../types/weatherTypes";

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
