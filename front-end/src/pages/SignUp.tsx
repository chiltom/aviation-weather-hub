import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SignUpForm from "../components/SignUpForm";
import { ContextType } from "../utilities";

const Signup = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <Container>
        <SignUpForm user={user} setUser={setUser} theme={theme} />
      </Container>
    </>
  );
};

export default Signup;
