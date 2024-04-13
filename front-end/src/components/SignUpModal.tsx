import { FormEventHandler, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import { signupUser } from "../utilities/userUtilities";
import { ContextType } from "../utilities/userUtilities";

const SignUpForm = ({ user, setUser, theme }: ContextType) => {
  const [show, setShow] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [displayNameInput, setDisplayNameInput] = useState<string>("");
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleSignup: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const user = await signupUser(
      emailInput,
      passwordInput,
      displayNameInput,
      firstNameInput,
      lastNameInput
    );
    if (user !== null) {
      setUser(user);
      console.log(user);
    } else {
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <Nav.Link data-bs-theme={theme} onClick={handleShow}>
        Sign Up
      </Nav.Link>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title className="text-white bg-slate">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-secondary">
            **Disclaimer: We will never share your personal information, this is
            simply used to validate clients for sign-in
          </p>
          <Form onSubmit={handleSignup}>
            <InputGroup className="mb-3 flex flex-row">
              <InputGroup.Text>Email address</InputGroup.Text>
              <Form.Control
                onChange={(e) => setEmailInput(e.target.value)}
                type="email"
                placeholder="Valid email address"
                autoFocus
              />
            </InputGroup>
            <InputGroup className="mb-3 flex justify-center">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                placeholder=""
              />
            </InputGroup>
            <InputGroup className="mb-3 flex justify-center">
              <InputGroup.Text>Display Name</InputGroup.Text>
              <Form.Control
                onChange={(e) => setDisplayNameInput(e.target.value)}
                type="displayName"
                placeholder="Only capital letters, lowercase letters, and the characters '.', '-', '_'"
              />
            </InputGroup>
            {/* TODO: Figure out how to make these two fields inline */}
            <InputGroup className="mb-3 flex justify-center">
              <InputGroup.Text>First Name</InputGroup.Text>
              <Form.Control
                onChange={(e) => setFirstNameInput(e.target.value)}
                type="firstName"
                placeholder="Title case"
              />
              <InputGroup.Text>Last Name</InputGroup.Text>
              <Form.Control
                onChange={(e) => setLastNameInput(e.target.value)}
                type="lastName"
                placeholder="Title case"
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

export default SignUpForm;
