import {
  useState,
  useEffect,
  ReactElement,
  FormEventHandler,
  FormEvent,
} from "react";
import { Flight } from "../../types/flightTypes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  getAFlight,
  updateAFlight,
} from "../../utilities/flights/flightUtilities";

/**
 * @description Defines the props that are passed down into the EditFlightModal
 * component.
 *
 * @property {string} theme The User's OS theme.
 * @property {Function} refreshFlights A function to refresh flight data after
 * a successful update.
 * @property {number} id The Flight's id.
 */
interface EditFlightModalProps {
  theme: string;
  refreshFlights: () => void;
  id: number;
}

/**
 * @description A component that contains a Form within a Modal to submit an
 * update for a Flight.
 *
 * @prop {string} theme The User's OS theme.
 * @prop {Function} refreshFlights A function to refresh flight data after
 * a successful update.
 * @prop {number} id The Flight's id.
 *
 * @returns {ReactElement} The EditFlightModal holding an update Form.
 */
const EditFlightModal: React.FC<EditFlightModalProps> = ({
  theme,
  refreshFlights,
  id,
}: EditFlightModalProps): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [newTailNumber, setNewTailNumber] = useState<number>(0);
  const [newCallsign, setNewCallsign] = useState<string>("");
  const [newAircraftTypeModel, setNewAircraftTypeModel] = useState<string>("");
  const [newPilotResponsible, setNewPilotResponsible] = useState<string>("");
  const [newOrigin, setNewOrigin] = useState<string>("");
  const [newDestination, setNewDestination] = useState<string>("");
  const [newFlightLevel, setNewFlightLevel] = useState<number>(0);
  const [newTakeoffTime, setNewTakeoffTime] = useState<string>("");
  const [newArrivalTime, setNewArrivalTime] = useState<string>("");

  /**
   * Fetches the Flight's current data and sets the new state values to the
   * current data when the Flight's id is passed down to the Modal.
   */
  useEffect(() => {
    const fetchFlight = async (flightId: number): Promise<void> => {
      const fetchedFlight: Flight | null = await getAFlight(flightId);
      if (fetchedFlight) {
        setNewTailNumber(fetchedFlight.tailNumber);
        setNewCallsign(fetchedFlight.callsign);
        setNewAircraftTypeModel(fetchedFlight.aircraftTypeModel);
        setNewPilotResponsible(fetchedFlight.pilotResponsible);
        setNewOrigin(fetchedFlight.origin);
        setNewDestination(fetchedFlight.destination);
        setNewFlightLevel(fetchedFlight.flightLevel);
        setNewTakeoffTime(fetchedFlight.takeoffTime);
        setNewArrivalTime(fetchedFlight.arrivalTime);
      }
    };
    fetchFlight(id);
  }, [id]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  /**
   * @description Handles the update of a Flight.
   *
   * @param {FormEvent} e The form event.
   */
  const handleUpdate: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ): Promise<void> => {
    e.preventDefault();
    const updatedFlight: Flight | null = await updateAFlight(
      id,
      newTailNumber,
      newCallsign,
      newAircraftTypeModel,
      newPilotResponsible,
      newOrigin,
      newDestination,
      newFlightLevel,
      newTakeoffTime,
      newArrivalTime
    );
    if (updatedFlight) {
      refreshFlights();
    } else {
      alert("Update unsuccessful");
    }
    handleClose();
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow} className="mx-2">
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white bg-slate">Edit Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <p className="text-center text-secondary mb-1">
              This number must be between 100 and 999.
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Tail Number</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={(e) => setNewTailNumber(Number(e.target.value))}
                value={newTailNumber.toString()}
              />
            </InputGroup>
            <p className="text-secondary text-center">
              Capital letters first with 1-3 numbers at the end with no spaces.
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Callsign</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewCallsign(e.target.value)}
                value={newCallsign}
              />
            </InputGroup>
            <p className="text-center text-secondary mb-1">
              Example: "CH-47F".
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Aircraft</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewAircraftTypeModel(e.target.value)}
                value={newAircraftTypeModel}
              />
            </InputGroup>
            <p className="text-center text-secondary mb-1">
              The Pilot's name must be in title case.
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Pilot</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewPilotResponsible(e.target.value)}
                value={newPilotResponsible}
              />
            </InputGroup>
            <p className="text-center text-secondary mb-1">
              ICAO codes must be all capitalized and only 4 letters.
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Origin</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewOrigin(e.target.value)}
                value={newOrigin}
              />
              <InputGroup.Text>Destination</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewDestination(e.target.value)}
                value={newDestination}
              />
            </InputGroup>
            <p className="text-center text-secondary mb-1">
              Flight level must be between 1 and 50,000
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Flight Level</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={(e) => setNewFlightLevel(Number(e.target.value))}
                value={newFlightLevel.toString()}
              />
            </InputGroup>
            <p className="text-center text-secondary mb-1">
              Time format is: YYYY-MM-DDTHH:MM:SSZ
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Takeoff Time</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewTakeoffTime(e.target.value)}
                value={newTakeoffTime}
              />
              <InputGroup.Text>Arrival Time</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewArrivalTime(e.target.value)}
                value={newArrivalTime}
              />
            </InputGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditFlightModal;
