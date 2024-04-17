import React, { ReactElement, useState, useEffect, useCallback } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Brief, Hazard } from "../../types/flightTypes";
import {
  deleteABrief,
  getABrief,
  getAllBriefs,
} from "../../utilities/flights/briefUtilities";
import {
  createHazard,
  deleteAHazard,
  updateAHazard,
} from "../../utilities/flights/hazardUtilities";
import EditBriefModal from "./EditBriefModal";
import CreateBriefModal from "./CreateBriefModal";

/**
 * @description Defines the props that are passed down into the BriefTabs component.
 *
 * @property {number} flightId The parent Flight's id.
 * @property {string} theme The User's OS theme.
 */
interface BriefProps {
  flightId: number;
  theme: string;
}

/**
 * @description A component that holds a Flight's Briefs in a bootstrap Tabs component
 * structure and contains a ListGroup container of associated Hazards. The component
 * contains handlers for CRUD capabilities on the Briefs and Hazards.
 *
 * @prop {number} flightId The parent flight's id
 * @prop {string} theme The User's OS theme
 *
 * @returns {ReactElement} The Tabs holding a Flight's Briefs and Hazards.
 */
const BriefTabs: React.FC<BriefProps> = ({ flightId, theme }): ReactElement => {
  const [componentBriefs, setComponentBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editHazardId, setEditHazardId] = useState<number | null>(null);
  const [updatedHazardType, setUpdatedHazardType] = useState<string>("");
  const [updatedHazardInformation, setUpdatedHazardInformation] =
    useState<string>("");
  const [createHazardBrief, setCreateHazardBrief] = useState<Brief | null>(
    null
  );
  const [newHazardType, setNewHazardType] = useState<string>("");
  const [newHazardInformation, setNewHazardInformation] = useState<string>("");

  useEffect(() => {
    const fetchBriefs = async (flightId: number): Promise<void> => {
      const fetchedBriefs: Brief[] | null = await getAllBriefs(flightId);
      if (fetchedBriefs) {
        setComponentBriefs(fetchedBriefs);
      }
    };
    fetchBriefs(flightId);
  }, [flightId]);

  useEffect(() => {
    setLoading(false);
  }, [componentBriefs]);

  /**
   * @description Handles the submission to create a new Hazard.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {Brief} brief The parent Brief of the hazard.
   */
  const handleCreateHazardSubmit = useCallback(
    async (brief: Brief): Promise<void> => {
      if (
        newHazardType.trim() !== "" &&
        newHazardType &&
        newHazardInformation.trim() !== "" &&
        newHazardInformation
      ) {
        const newHazard: Hazard | null = await createHazard(
          brief,
          newHazardType,
          newHazardInformation
        );
        if (newHazard) {
          const updatedBrief: Brief | null = await getABrief(
            flightId,
            brief.id
          );
          if (updatedBrief) {
            setComponentBriefs((prevBriefs) =>
              prevBriefs.map((oldBrief) =>
                oldBrief.id === brief.id ? updatedBrief : oldBrief
              )
            );
          }
          setNewHazardType("");
          setNewHazardInformation("");
          setCreateHazardBrief(null);
        }
      } else {
        alert("Hazard must contain a type and information");
      }
    },
    [newHazardType, newHazardInformation]
  );

  /**
   * @description Handles the event of request to edit a Hazard.
   *
   * @param {Brief} brief The parent Brief.
   * @param {string} currentType The current type value of the Hazard.
   * @param {string} currentInformation The current information value of the
   * Hazard.
   */
  const handleEditHazard = (
    hazardId: number,
    currentType: string,
    currentInformation: string
  ): void => {
    setEditHazardId(hazardId);
    setUpdatedHazardType(currentType);
    setUpdatedHazardInformation(currentInformation);
  };

  /**
   * @description Handles the submission of the update of a Hazard to the handleHazardUpdate
   * function.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {Brief} brief The parent Brief.
   * @param {number} hazardId The Hazard's id.
   */
  const handleSubmitHazardUpdate = useCallback(
    async (brief: Brief, hazardId: number): Promise<void> => {
      if (
        updatedHazardType.trim() !== "" &&
        updatedHazardType &&
        updatedHazardInformation.trim() !== "" &&
        updatedHazardInformation
      ) {
        await handleHazardUpdate(
          brief,
          hazardId,
          updatedHazardType,
          updatedHazardInformation
        );
        setEditHazardId(null);
      }
    },
    [updatedHazardType, updatedHazardInformation]
  );

  /**
   * @description Handles the submission of a Hazard update.
   *
   * @param {Brief} brief The parent Brief.
   * @param {number} hazardId The Hazard's id.
   * @param {string} newType The new type value of the Hazard.
   * @param {string} newInformation The new information value of the Hazard.
   */
  const handleHazardUpdate = async (
    brief: Brief,
    hazardId: number,
    newType: string,
    newInformation: string
  ): Promise<void> => {
    const updatedHazard: Hazard | null = await updateAHazard(
      brief,
      hazardId,
      newType,
      newInformation
    );
    if (updatedHazard) {
      setComponentBriefs((prevBriefs) =>
        prevBriefs.map((oldBrief) =>
          oldBrief.id === brief.id
            ? {
                ...brief,
                hazards: brief.hazards.map((hazard) =>
                  hazard.id === hazardId ? updatedHazard : hazard
                ),
              }
            : oldBrief
        )
      );
    }
  };

  /**
   * @description Handles the deletion of a Hazard.
   *
   * @param {Brief} brief The parent Brief.
   * @param {number} hazardId The Hazard's id.
   */
  const handleHazardDelete = async (
    brief: Brief,
    hazardId: number
  ): Promise<void> => {
    const success: boolean = await deleteAHazard(brief, hazardId);
    if (success) {
      const updatedBrief: Brief | null = await getABrief(
        brief.flight,
        brief.id
      );
      if (updatedBrief) {
        setComponentBriefs((prevBriefs) =>
          prevBriefs.map((brief) =>
            brief.id === updatedBrief.id ? updatedBrief : brief
          )
        );
      }
    }
  };

  /**
   * @description Handles the deletion of a Brief.
   *
   * @param {number} flightId The parent Flight's id.
   * @param {number} briefId The Brief's id.
   */
  const handleBriefDelete = async (
    flightId: number,
    briefId: number
  ): Promise<void> => {
    const success: boolean = await deleteABrief(flightId, briefId);
    success
      ? setComponentBriefs((prevBriefs) =>
          prevBriefs.filter((brief) => brief.id !== briefId)
        )
      : alert("Deletion unsuccessful");
  };

  return (
    <>
      {!loading ? (
        <div>
          <div className="d-flex flex-row justify-content-end">
            <CreateBriefModal
              theme={theme}
              flightId={flightId}
              setBriefs={setComponentBriefs}
            />
          </div>
          <Tabs defaultActiveKey="0" id="brief-tabs">
            {componentBriefs.map((brief, idx) => (
              <Tab
                eventKey={idx.toString()}
                title={`Brief ${idx + 1}`}
                key={brief.id}
              >
                <Card.Body>
                  <Card.Text>
                    Surface Winds: {brief.surfaceWinds} | Flight Level Winds:{" "}
                    {brief.flightLevelWinds}
                  </Card.Text>
                  <Card.Text>
                    Visibility: {brief.visibility} | Sky Condition:{" "}
                    {brief.skyCondition}
                  </Card.Text>
                  <Card.Text>
                    Temperature: {brief.temperature} | Altimeter Setting:{" "}
                    {brief.altimeterSetting}
                  </Card.Text>
                  <Card.Text>
                    Brief Time: {brief.briefTime} | Void Time: {brief.voidTime}
                  </Card.Text>
                  <ListGroup>
                    {brief.hazards.map((hazard) => (
                      <React.Fragment key={hazard.id}>
                        {editHazardId === hazard.id ? (
                          <div>
                            <InputGroup>
                              <InputGroup.Text>Type</InputGroup.Text>
                              <input
                                type="text"
                                value={updatedHazardType}
                                onChange={(e) =>
                                  setUpdatedHazardType(e.target.value)
                                }
                                className="form-control"
                              />
                              <InputGroup.Text>Info</InputGroup.Text>
                              <input
                                type="text"
                                value={updatedHazardInformation}
                                onChange={(e) =>
                                  setUpdatedHazardInformation(e.target.value)
                                }
                                className="form-control"
                              />
                              <Button
                                onClick={() =>
                                  handleSubmitHazardUpdate(brief, hazard.id)
                                }
                                variant="primary"
                                size="sm"
                              >
                                Save
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => setEditHazardId(null)}
                                size="sm"
                              >
                                Cancel
                              </Button>
                            </InputGroup>
                          </div>
                        ) : (
                          <ListGroup.Item className="d-flex flex-row justify-content-between align-items-center">
                            {hazard.type}: {hazard.information}
                            <div className="d-flex flex-row justify-content-end align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  handleEditHazard(
                                    hazard.id,
                                    hazard.type,
                                    hazard.information
                                  )
                                }
                                className="mx-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  handleHazardDelete(brief, hazard.id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </ListGroup.Item>
                        )}
                      </React.Fragment>
                    ))}
                    {createHazardBrief?.id === brief.id ? (
                      <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <InputGroup>
                          <InputGroup.Text>Type</InputGroup.Text>
                          <input
                            type="text"
                            value={newHazardType}
                            onChange={(e) => setNewHazardType(e.target.value)}
                            className="form-control"
                          />
                          <InputGroup.Text>Information</InputGroup.Text>
                          <input
                            type="text"
                            value={newHazardInformation}
                            onChange={(e) =>
                              setNewHazardInformation(e.target.value)
                            }
                            className="form-control"
                          />
                          <Button
                            onClick={() => handleCreateHazardSubmit(brief)}
                            variant="primary"
                            size="sm"
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => setCreateHazardBrief(null)}
                            variant="danger"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </InputGroup>
                      </div>
                    ) : (
                      <ListGroup.Item className="d-flex flex-row justify-content-end">
                        <Button
                          variant="outline-primary"
                          onClick={() => setCreateHazardBrief(brief)}
                          className="w-25"
                          size="sm"
                        >
                          Create Hazard
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
                <div
                  className="d-flex flex-row justify-content-end"
                  style={{ paddingRight: "20px" }}
                >
                  <EditBriefModal
                    theme={theme}
                    setBriefs={setComponentBriefs}
                    briefId={brief.id}
                    flightId={brief.flight}
                  />
                  <Button
                    variant="outline-danger"
                    onClick={() => handleBriefDelete(flightId, brief.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      ) : null}
    </>
  );
};

export default BriefTabs;
