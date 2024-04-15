import { useState, ReactElement, FormEventHandler } from "react";
import { Brief } from "../../types/flightTypes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { createBrief } from "../../utilities/flights/briefUtilities";

interface EditBriefModalProps {
  theme: string;
  setBriefs: React.Dispatch<React.SetStateAction<Brief[]>>;
  flightId: number;
}

const CreateBriefModal: React.FC<EditBriefModalProps> = ({
  theme,
  setBriefs,
  flightId,
}: EditBriefModalProps): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [newSurfaceWinds, setNewSurfaceWinds] = useState<string>("");
  const [newFlightLevelWinds, setNewFlightLevelWinds] = useState<string>("");
  const [newVisibility, setNewVisibility] = useState<string>("");
  const [newSkyCondition, setNewSkyCondition] = useState<string>("");
  const [newTemperature, setNewTemperature] = useState<string>("");
  const [newAltimeterSetting, setNewAltimeterSetting] = useState<string>("");
  const [newBriefTime, setNewBriefTime] = useState<string>("");
  const [newVoidTime, setNewVoidTime] = useState<string>("");

  const handleShow = (): void => setShow(true);
  const handleClose = (): void => setShow(false);
  const handleSuccessClear = (): void => {
    setNewSurfaceWinds("");
    setNewFlightLevelWinds("");
    setNewVisibility("");
    setNewSkyCondition("");
    setNewTemperature("");
    setNewAltimeterSetting("");
    setNewBriefTime("");
    setNewVoidTime("");
  };

  const handleCreate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newBrief: Brief | null = await createBrief(
      flightId,
      newSurfaceWinds,
      newFlightLevelWinds,
      newVisibility,
      newSkyCondition,
      newTemperature,
      newAltimeterSetting,
      newBriefTime,
      newVoidTime
    );
    if (newBrief) {
      setBriefs((prevBriefs) => prevBriefs.concat(newBrief));
      handleSuccessClear();
    }
    handleClose();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} className="w-25">
        Create Brief
      </Button>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white bg-slate">Create Brief</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
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
            <p className="text-seconday text-center">
              Time format is: YYYY-MM-DDTHH:MM:SSZ
            </p>
            <InputGroup className="mb-3 d-flex flex-row">
              <InputGroup.Text>Brief Time</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewBriefTime(e.target.value)}
                value={newBriefTime}
              />
              <InputGroup.Text>Void Time</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(e) => setNewVoidTime(e.target.value)}
                value={newVoidTime}
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

export default CreateBriefModal;
