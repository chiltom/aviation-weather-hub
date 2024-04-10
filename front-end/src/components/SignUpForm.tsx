import { FormEventHandler, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signupUser } from "../utilities";
import { ContextType } from "../utilities";

const SignUpForm = ({ user, setUser, theme }: ContextType) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

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
      alert("Sign up failed. Please try again.")
    }
  };

  return (
    <>
      {/* TODO: Figure out how to set max width of div */}
      <Container data-bs-theme={theme}>
        <h2 className="text-center">Sign Up</h2>
        <Row>
          <p className="text-center text-secondary">
            **Disclaimer: We will never share your personal information, this is
            simply used to validate clients for sign-in
          </p>
          <Form onSubmit={handleSignup}>
            <Form.Group
              className="mb-3 flex flex-row"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmailInput(e.target.value)}
                type="email"
                placeholder="Must be a valid email address"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 flex flex-row"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3 flex flex-row">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                onChange={(e) => setDisplayNameInput(e.target.value)}
                type="displayName"
                placeholder="Display name may only contain capital letters, lowercase letters, and the characters '.', '-', '_'"
              />
            </Form.Group>
            {/* TODO: Figure out how to make these two fields inline */}
            <Form.Group className="mb-3 flex flex-row">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={(e) => setFirstNameInput(e.target.value)}
                type="firstName"
                placeholder="Must be in Title case"
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => setLastNameInput(e.target.value)}
                type="lastName"
                placeholder="Must be in Title case"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default SignUpForm;
