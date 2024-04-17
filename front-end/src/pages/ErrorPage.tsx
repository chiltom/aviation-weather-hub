import { ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

/**
 * @description The standard Error Page that will display if 
 * any errors occur while loading site data.
 * 
 * @returns {ReactElement} Error Page.
 */
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
