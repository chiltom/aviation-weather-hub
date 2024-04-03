import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { userLogout } from "../utilities";

const MyNavbar = ({ user, setUser }) => {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

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
            <Nav.Link as={Link} to={"/signup/"} className="hover:drop-shadow">
              Sign Up
            </Nav.Link>
            {user ? null : (
              <Nav.Link as={Link} to={"/login/"} className="hover:drop-shadow">
                Log In
              </Nav.Link>
            )}
            {!user ? null : (
              <Button
                onClick={() => handleUserLogout()}
                variant="outline-danger"
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
