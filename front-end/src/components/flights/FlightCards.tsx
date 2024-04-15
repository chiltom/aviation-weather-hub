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

const FlightCards: React.FC<ContextType> = ({ theme }): ReactElement => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async (): Promise<void> => {
      const fetchedFlights: Flight[] | null = await getAllFlights();
      fetchedFlights ? setFlights(fetchedFlights) : null;
    };
    fetchFlights();
  }, []);

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
        <Row
          sm={1}
          className="d-flex flex-row gap-2 justify-content-evenly align-items-center"
        >
          {flights.map((flight) => (
            <Col
              key={flight.id}
              className="d-flex flex-row flex-grow-1 justify-content-center"
            >
              <Card className="px-0">
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
                  <EditFlightModal
                    setFlights={setFlights}
                    id={flight.id}
                    theme={theme}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(flight.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
              <BriefTabs flightId={flight.id} />
            </Col>
          ))}
        </Row>
        <CreateFlightModal theme={theme} setFlights={setFlights} />
      </Container>
    </>
  );
};

export default FlightCards;
