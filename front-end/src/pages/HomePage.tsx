import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ContextType } from "../types/userTypes";
import HomeCarousel from "../components/home-page/HomeCarousel";
import PurposeStatement from "../components/home-page/PurposeStatement";
import ElevatorPitch from "../components/home-page/ElevatorPitch";

const HomePage: React.FC = (): ReactElement => {
  const { theme }: ContextType = useOutletContext<ContextType>();

  return (
    <Container className="d-flex flex-column" fluid>
      <Row>
        <h1 className="text-center">The Aviation Weather Hub</h1>
        <HomeCarousel />
      </Row>
      <Row>
        <Col data-bs-theme={theme} style={{ padding: "20px" }}>
          <PurposeStatement />
        </Col>
        <Col data-bs-theme={theme} style={{ padding: "20px"}}>
          <ElevatorPitch />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
