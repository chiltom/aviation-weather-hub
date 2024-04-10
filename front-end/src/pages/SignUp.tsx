import { useOutletContext } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  const { setUser, theme } = useOutletContext();

  return (
    <>
      <SignUpForm setUser={setUser} theme={theme} />
    </>
  );
};

export default Signup;
