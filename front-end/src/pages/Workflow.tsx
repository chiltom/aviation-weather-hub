import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Lists from "../components/Lists";
import { ContextType } from "../utilities/userUtilities";
import Airports from "../components/Airports";

const Workflow = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <h1>Weather Page</h1>
      <Container fluid>
        <Row>
          {/* airports and locations stuff */}
          <Airports user={user} setUser={setUser} theme={theme}/>
        </Row>
        <Row>
          <Lists user={user} setUser={setUser} theme={theme}/>
        </Row>
      </Container>
    </>
  );
};

export default Workflow;
