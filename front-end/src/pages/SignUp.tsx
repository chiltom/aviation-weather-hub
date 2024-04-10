import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { ContextType } from "../utilities";

const Signup = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  return (
    <>
      <SignUpForm user={user} setUser={setUser} theme={theme} />
    </>
  );
};

export default Signup;
