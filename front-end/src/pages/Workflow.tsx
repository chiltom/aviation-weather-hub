import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import ListsAccordion from "../components/workflow/lists/ListsAccordion";
import { ContextType } from "../types/userTypes";
import NamedLocationsListGroup from "../components/workflow/NamedLocationsListGroup";
import { WeatherProvider } from "../providers/WeatherContextProvider";
import WeatherDisplay from "../components/workflow/weather-display/WeatherDisplay";
import AirportsListGroup from "../components/workflow/Airports";

const Workflow: React.FC = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <WeatherProvider>
        <div className="d-flex flex-column">
          <div className="d-flex flex-grow-1 align-items-center my-3">
            <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
              <AirportsListGroup user={user} setUser={setUser} theme={theme} />
            </div>
            <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
              <NamedLocationsListGroup user={user} setUser={setUser} theme={theme} />
            </div>
          </div>
          <div>
            <WeatherDisplay />
          </div>
          <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
            <ListsAccordion user={user} setUser={setUser} theme={theme} />
          </div>
        </div>
      </WeatherProvider>
    </>
  );
};

export default Workflow;
