import { FormEventHandler, ReactElement, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userLogin, ContextType } from "../utilities";

const LoginForm = ({ user, setUser, theme }: ContextType): ReactElement => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const user = await userLogin(emailInput, passwordInput);
    if (user !== null) {
      setUser(user);
      console.log(user)
    } else {
      alert("Login failed. Please try again.")
    }
  };

  return (
    <>
      <Container data-bs-theme={theme}>
        <h2 className="text-center">Login</h2>
        <Row>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmailInput(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                placeholder="Password"
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

export default LoginForm;
