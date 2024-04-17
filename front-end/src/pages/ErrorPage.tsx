import { ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ErrorPage: React.FC = (): ReactElement => {

  return (
    <Container>
      <Row>
        <h1 className="text-center">Error Page</h1>
      </Row>
    </Container>
  );
};

export default ErrorPage;
