import { FormEventHandler, ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import { userLogin, ContextType } from "../../utilities/userUtilities";

const LoginForm: React.FC<ContextType> = ({
  user,
  setUser,
  theme,
}: ContextType): ReactElement => {
  const [show, setShow] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const user = await userLogin(emailInput, passwordInput);
    if (user !== null) {
      setUser(user);
      console.log(user);
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Nav.Link onClick={handleShow} data-bs-theme={theme}>
        Log In
      </Nav.Link>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white bg-slate">Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Email address</InputGroup.Text>
              <Form.Control
                onChange={(e) => setEmailInput(e.target.value)}
                type="email"
                placeholder="Enter email"
                autoFocus
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;
