import { ReactElement } from "react";

/**
 * @description The component that holds the user story/persona mockup 
 * for the end user of this service.
 * 
 * @returns {ReactElement} The Purpose Statement for the site.
 */
const PurposeStatement: React.FC = (): ReactElement => {
  return (
    <>
      <h3 className="text-center">To All Forecasters:</h3>
      <p>
        Forecasting weather and briefing crews for aviation assets is no easy
        task.
      </p>
      <p>
        Looking at multiple map layers including radar, satellite, wind, and
        many more , while also gathering METAR and TAF output from different air
        stations enroute, while also gathering flight information and keeping
        track of which aircraft can fly through which conditions... the list is
        cumbersome, even for small airlines.
      </p>
      <p>
        When the organization gets larger and larger, the number of forecasters
        required to perform this task is tremendous. Generally, this fact is not
        understood or heard by management and teams are left with minimum
        personnel to brief tens-hundreds of flights per day.
      </p>
    </>
  );
};

export default PurposeStatement;
