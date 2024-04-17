import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../types/userTypes";
import FlightCards from "../components/flights/FlightCards";

/**
 * @description This page houses the FlightCards component and provides
 * users with a means to track all of their Flights and relevant data 
 * associated with them.
 * 
 * @returns {ReactElement} Flights Page.
 */
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
