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
   * Handles the deletion of a specified flight by passing in the flight id as
   * a parameter.
   *
   * If the request is successful, the flights are mapped over and the flight
   * matching the parameter is filtered out.
   *
   * If the request is unsuccessful, nothing happens.
   * @param flightId
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
                    <Card.Text>
                      {flight.origin} - {flight.destination}
                    </Card.Text>
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
