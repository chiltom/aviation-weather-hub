import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SignUpForm from "../user/SignUpModal";
import { userLogout, ContextType } from "../../utilities/userUtilities";
import LoginForm from "../user/LoginModal";

const MyNavbar: React.FC<ContextType> = ({
  user,
  setUser,
  theme,
}: ContextType): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

  return (
    <>
      <Navbar
        expanded={expanded}
        expand="lg"
        className="sticky-top"
        data-bs-theme={theme}
      >
        <Navbar.Brand as={Link} to={"/"}>
          Weather Hub
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={"/about/"}
              onClick={() => setExpanded(false)}
              className="hover:drop-shadow"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/training/"}
              onClick={() => setExpanded(false)}
              className="hover:drop-shadow"
            >
              Training
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/workflow/"}
              onClick={() => setExpanded(false)}
              className="hover:drop-shadow"
            >
              Workflow
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/flights/"}
              onClick={() => setExpanded(false)}
              className="hover:drop-shadow"
            >
              Flights
            </Nav.Link>
          </Nav>
          {user ? null : (
            <Nav>
              <SignUpForm user={user} setUser={setUser} theme={theme} />
              <LoginForm user={user} setUser={setUser} theme={theme} />
            </Nav>
          )}
          {!user ? null : (
            <Nav>
              <Nav.Link
                as={Link}
                to={"/userinfo/"}
                onClick={() => setExpanded(false)}
              >
                Signed in as: {user.displayName}
              </Nav.Link>
              <Button
                onClick={() => handleUserLogout()}
                variant="outline-danger"
              >
                Log Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
