import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { userLogout } from "../utilities";

const MyNavbar = ({ user, setUser, theme }) => {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" data-bs-theme={theme}>
        <Navbar.Brand as={Link} to={"/"}>
          Weather Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/about/"} className="hover:drop-shadow">
              About
            </Nav.Link>
            <Nav.Link as={Link} to={"/training/"} className="hover:drop-shadow">
              Training
            </Nav.Link>
            <Nav.Link as={Link} to={"/workflow/"} className="hover:drop-shadow">
              Workflow
            </Nav.Link>
            <Nav.Link as={Link} to={"/flights/"} className="hover:drop-shadow">
              Flights
            </Nav.Link>
          </Nav>
          {user ? null : (
            <Nav>
              <Nav.Link as={Link} to={"/signup/"} className="hover:drop-shadow">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to={"/login/"} className="hover:drop-shadow">
                Log In
              </Nav.Link>
            </Nav>
          )}
          {/* Make into link to go to user info page with put request method to change
            user info */}
          {!user ? null : <Navbar.Text>Signed in as: {user}</Navbar.Text>}
          {!user ? null : (
            <Button onClick={() => handleUserLogout()} variant="outline-danger">
              Log Out
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
