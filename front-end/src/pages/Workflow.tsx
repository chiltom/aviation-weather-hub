import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Lists from "../components/Lists";
import { ContextType } from "../utilities/userUtilities";
import Airports from "../components/Airports";
import NamedLocations from "../components/NamedLocations";

const Workflow: React.FC = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <h1>Weather Page</h1>
      <div className="d-flex flex-column">
        <div className="d-flex flex-grow-1 align-items-center my-3">
          {/* airports and locations stuff */}
          <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
            <Airports user={user} setUser={setUser} theme={theme} />
          </div>
          <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
            <NamedLocations user={user} setUser={setUser} theme={theme} />
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-1 h-100 mx-1">
          <Lists user={user} setUser={setUser} theme={theme} />
        </div>
      </div>
    </>
  );
};

export default Workflow;
