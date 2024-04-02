import { ReactNode } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const MyNavbar = (): ReactNode => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary flex flex-row items-center mx-3"
      >
        <Navbar.Brand as={Link} to={"/"}>
          Weather-App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/about/"} className="hover:drop-shadow">
              About
            </Nav.Link>
            <Nav.Link as={Link} to={"/weather/"} className="hover:drop-shadow">
              Weather
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
