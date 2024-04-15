import { useState, useEffect, ReactElement, FormEventHandler } from "react";
import { Brief } from "../../types/flightTypes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  getABrief,
  updateABrief,
} from "../../utilities/flights/briefUtilities";

interface EditBriefModalProps {
  theme: string;
  setBriefs: React.Dispatch<React.SetStateAction<Brief[]>>;
  briefId: number;
  flightId: number;
}

const EditBriefModal: React.FC<EditBriefModalProps> = ({
  theme,
  setBriefs,
  briefId,
  flightId,
}: EditBriefModalProps): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [newSurfaceWinds, setNewSurfaceWinds] = useState<string>("");
  const [newFlightLevelWinds, setNewFlightLevelWinds] = useState<string>("");
  const [newVisibility, setNewVisibility] = useState<string>("");
  const [newSkyCondition, setNewSkyCondition] = useState<string>("");
  const [newTemperature, setNewTemperature] = useState<string>("");
  const [newAltimeterSetting, setNewAltimeterSetting] = useState<string>("");

  useEffect(() => {
    const fetchBrief = async (
      briefId: number,
      flightId: number
    ): Promise<void> => {
      const fetchedBrief: Brief | null = await getABrief(briefId, flightId);
      if (fetchedBrief) {
        setNewSurfaceWinds(fetchedBrief.surfaceWinds);
        setNewFlightLevelWinds(fetchedBrief.flightLevelWinds);
        setNewVisibility(fetchedBrief.visibility);
        setNewSkyCondition(fetchedBrief.skyCondition);
        setNewTemperature(fetchedBrief.temperature);
        setNewAltimeterSetting(fetchedBrief.altimeterSetting);
      }
    };
    fetchBrief(briefId, flightId);
  }, [briefId, flightId]);

  const handleShow = (): void => setShow(true);
  const handleClose = (): void => setShow(false);

  const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const updatedBrief: Brief | null = await updateABrief(
      flightId,
      briefId,
      newSurfaceWinds,
      newFlightLevelWinds,
      newVisibility,
      newSkyCondition,
      newTemperature,
      newAltimeterSetting,
    );
    updatedBrief
      ? setBriefs((prevBriefs) =>
          prevBriefs.map((brief) =>
            brief.id === briefId ? updatedBrief : brief
          )
        )
      : alert("Unsuccessful update");
    handleClose();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white bg-slate">Edit Brief</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <p className="text-center text-secondary mb-1">
              These values may incorporate gusts but must end in KT and be
              uppercase
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Surface Winds</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewSurfaceWinds(e.target.value)}
                value={newSurfaceWinds}
              />
              <InputGroup.Text>Flight Level Winds</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewFlightLevelWinds(e.target.value)}
                value={newFlightLevelWinds}
              />
            </InputGroup>
            <p className="text-secondary text-center">
              Must end in SM and be uppercase
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Visibility</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewVisibility(e.target.value)}
                value={newVisibility}
              />
            </InputGroup>
            <p className="text-secondary text-center">
              Sky Condition must be uppercase and a valid value
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Sky Condition</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewSkyCondition(e.target.value)}
                value={newSkyCondition}
              />
            </InputGroup>
            <p className="text-center text-secondary">
              Temperature must be no longer than 4 characters, Altimeter Setting
              must start with A
            </p>
            <InputGroup className="d-flex flex-row mb-3">
              <InputGroup.Text>Temperature</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewTemperature(e.target.value)}
                value={newTemperature}
              />
              <InputGroup.Text>Altimeter Setting</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewAltimeterSetting(e.target.value)}
                value={newAltimeterSetting}
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

export default EditBriefModal;
