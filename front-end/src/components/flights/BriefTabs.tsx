import { ReactElement, useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Brief } from "../../types/flightTypes";
import {
  deleteABrief,
  getAllBriefs,
} from "../../utilities/flights/briefUtilities";
import EditBriefModal from "./EditBriefModal";
import CreateBriefModal from "./CreateBriefModal";

interface BriefProps {
  flightId: number;
  theme: string;
}

const BriefTabs: React.FC<BriefProps> = ({ flightId, theme }): ReactElement => {
  const [componentBriefs, setComponentBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
                      <ListGroup.Item
                        key={hazard.id}
                        className="d-flex flex-row justify-content-between align-items-center"
                      >
                        {hazard.type}: {hazard.information}
                        <div>
                          <Button variant="outline-secondary" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Delete
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
