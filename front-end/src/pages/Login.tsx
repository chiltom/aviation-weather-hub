import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ContextType } from "../utilities/userUtilities";
import LoginForm from "../components/LoginForm";

const Login = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <Container>
        <LoginForm user={user} setUser={setUser} theme={theme}/>
      </Container>
    </>
  );
};

export default Login;
