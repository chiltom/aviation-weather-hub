import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../types/userTypes";
import FlightCards from "../components/flights/FlightCards";

// TODO: Think about using accordion under each flight to show all data
const Flights: React.FC = (): ReactElement => {
  const { theme, user, setUser }: ContextType = useOutletContext();

  return (
    <>
      <div className="d-flex flex-column" data-bs-theme={theme}>
        <FlightCards theme={theme} user={user} setUser={setUser} />
      </div>
    </>
  );
};

export default Flights;
