import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ContextType } from "../types/userTypes";

const ErrorPage: React.FC = (): ReactElement => {
  const { theme }: ContextType = useOutletContext<ContextType>();

  return (
    <Container data-bs-theme={theme}>
      <Row>
        <h1 className="text-center">Error Page</h1>
      </Row>
    </Container>
  );
};

export default ErrorPage;
