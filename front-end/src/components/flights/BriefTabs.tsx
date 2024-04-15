import React, { ReactElement, useState, useEffect, useCallback } from "react";
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

interface BriefProps {
  flightId: number;
  theme: string;
}

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

  /**
   * This function handles the creation of a new hazard by submitting the new hazard
   * type and information into the createBrief function along with the parent brief.
   *
   * If then awaits the completion of creating a new hazard and sets the newHazardType
   * and newHazardInformation state back to empty strings, as well as the createHazardBrief
   * value back to null
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
   * Function that handles the editing of a hazard type and information and attaches
   * it to a button.
   *
   * If the button is clicked, the input boxes' values are set to to the current type
   * and information. It then allows the user to edit the type and information and submit
   * submit an update request.
   * @param brief
   * @param currentType
   * @param currentInformation
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
   * This function handles the submission of the editing of a hazard.
   *
   * If the type and information are both not empty and exist, the function
   * then awaits the update of the hazard by the handleHazardUpdate method and then
   * sets the edit hazard id back to null so no hazard is editable again.
   * @param brief
   * @param hazardId
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
   * This function takes a parent brief, a hazard's id, and new information and type
   * for the hazard and calls the updateAHazard method to update the hazard.
   *
   * If the request is successful, it updates the briefs stste by mapping over the
   * previous briefs and checking which brief matches the parent brief parameter's id.
   *
   * Once it finds the correct brief id, it returns a new brief object with the updated
   * hazard inside. For other briefs, they are left alone.
   *
   * If the request is unsuccessful, nothing happens.
   * @param brief
   * @param hazardId
   * @param newType
   * @param newInformation
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
   * This function takes a parent brief and a hazard's id as parameters and uses
   * the deleteAHazard method to delete a hazard.
   *
   * If this is successful, the updated Brief is grabbed from the server using the
   * getABrief method and the updatedBrief replaces its old value in the componentBriefs
   * array.
   * @param brief
   * @param hazardId
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

  const handleDelete = async (
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
        <Card className="d-flex flex-column justify-content-between">
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
                          <ListGroup.Item className="d-flex flex-row justify-content-between align-items-center">
                            <input
                              type="text"
                              value={updatedHazardType}
                              onChange={(e) =>
                                setUpdatedHazardType(e.target.value)
                              }
                              className="flex-grow-1 form-control mr-2"
                            />
                            <input
                              type="text"
                              value={updatedHazardInformation}
                              onChange={(e) =>
                                setUpdatedHazardInformation(e.target.value)
                              }
                              className="flex-grow-1 form-control mr-2"
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
                          </ListGroup.Item>
                        ) : (
                          <ListGroup.Item className="d-flex flex-row justify-content-between align-items-center">
                            {hazard.type}: {hazard.information}
                            <div>
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
                  </ListGroup>
                  {createHazardBrief?.id === brief.id ? (
                    <div className="d-flex flex-row justify-content-evenly align-items-center">
                      <input
                        type="text"
                        value={newHazardType}
                        onChange={(e) => setNewHazardType(e.target.value)}
                      />
                      <input
                        type="text"
                        value={newHazardInformation}
                        onChange={(e) =>
                          setNewHazardInformation(e.target.value)
                        }
                      />
                      <Button
                        onClick={() => handleCreateHazardSubmit(brief)}
                        variant="primary"
                        size="sm"
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => setCreateHazardBrief(brief)}
                    >
                      Create New Hazard
                    </Button>
                  )}
                </Card.Body>
                <EditBriefModal
                  theme={theme}
                  setBriefs={setComponentBriefs}
                  briefId={brief.id}
                  flightId={brief.flight}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(flightId, brief.id)}
                >
                  Delete
                </Button>
              </Tab>
            ))}
          </Tabs>
          <CreateBriefModal
            theme={theme}
            flightId={flightId}
            setBriefs={setComponentBriefs}
          />
        </Card>
      ) : null}
    </>
  );
};

export default BriefTabs;
