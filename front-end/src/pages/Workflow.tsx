import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Lists from "../components/workflow/lists/Lists";
import { ContextType } from "../types/userTypes";
import Airports from "../components/workflow/Airports";
import NamedLocations from "../components/workflow/NamedLocations";
import { WeatherProvider } from "../providers/weatherContext";
import WeatherDisplay from "../components/workflow/weather-display/WeatherDisplay";

const Workflow: React.FC = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <h1>Weather Page</h1>
      <WeatherProvider>
        <div className="d-flex flex-column">
          <div className="d-flex flex-grow-1 align-items-center my-3">
            <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
              <Airports user={user} setUser={setUser} theme={theme} />
            </div>
            <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
              <NamedLocations user={user} setUser={setUser} theme={theme} />
            </div>
          </div>
          <div>
            <WeatherDisplay />
          </div>
          <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
            <Lists user={user} setUser={setUser} theme={theme} />
          </div>
        </div>
      </WeatherProvider>
    </>
  );
};

export default Workflow;
