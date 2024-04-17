import { useState, useEffect, ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Flight } from "../../types/flightTypes";
import { ContextType } from "../../types/userTypes";
import {
  deleteAFlight,
  getAllFlights,
} from "../../utilities/flights/flightUtilities";
import BriefTabs from "./BriefTabs";
import EditFlightModal from "./EditFlightModal";
import CreateFlightModal from "./CreateFlightModal";
import "../../styles/flights.css";

/**
 * @description A component that holds a User's Flights in a bootstrap grid
 * setup with each flight being represented by a Card. This component also
 * contains handlers for CRUD capability on the Flights.
 *
 * @prop {string} theme The User's OS theme.
 *
 * @returns {ReactElement} FlightCards in a grid structure.
 */
const FlightCards: React.FC<ContextType> = ({ theme }): ReactElement => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async (): Promise<void> => {
      const fetchedFlights: Flight[] | null = await getAllFlights();
      fetchedFlights ? setFlights(fetchedFlights) : null;
    };
    fetchFlights();
  }, []);

  /**
   * @description Handles the deletion of a Flight.
   *
   * @param {number} flightId The Flight's id.
   */
  const handleDelete = async (flightId: number): Promise<void> => {
    const success: boolean = await deleteAFlight(flightId);
    success
      ? setFlights((prevFlights) =>
          prevFlights.filter((flight) => flight.id !== flightId)
        )
      : alert("Deletion unsuccessful");
  };

  return (
    <>
      <Container
        data-bs-theme={theme}
        className="d-flex flex-column gap-2 m-2"
        fluid
      >
        <Row className="d-flex flex-row">
          <span className="text-white">
            Number of Flights: {flights.length}{" "}
            <CreateFlightModal theme={theme} setFlights={setFlights} />
          </span>
        </Row>
        {flights.map((flight) => (
          <Row key={flight.id} className="mb-3">
            <Card className="d-flex w-100">
              <Row noGutters className="w-100">
                <Col md={6} className="flight-details">
                  <Card.Header>Callsign: {flight.callsign}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {flight.tailNumber} - {flight.aircraftTypeModel}
                    </Card.Text>
                    <Card.Text>POC: {flight.pilotResponsible}</Card.Text>
                    <Card.Text>Origin: {flight.origin}</Card.Text>
                    <Card.Text>Destination {flight.destination}</Card.Text>
                    <Card.Text>Flight Level: {flight.flightLevel}</Card.Text>
                    <Card.Text>Takeoff: {flight.takeoffTime}</Card.Text>
                    <Card.Text>Arrival: {flight.arrivalTime}</Card.Text>
                    <div className="d-flex flex-row justify-content-end align-items-center">
                      <EditFlightModal
                        setFlights={setFlights}
                        id={flight.id}
                        theme={theme}
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(flight.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
                <Col md={6} className="brief-details">
                  <BriefTabs flightId={flight.id} theme={theme} />
                </Col>
              </Row>
            </Card>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default FlightCards;
