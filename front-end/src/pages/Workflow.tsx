import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Lists from "../components/Lists";
import { ContextType } from "../utilities/userUtilities";

const Workflow = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <h1>Weather Page</h1>
      <Container>
        <Row>
          <Lists user={user} setUser={setUser} theme={theme}/>
        </Row>
      </Container>
    </>
  );
};

export default Workflow;
