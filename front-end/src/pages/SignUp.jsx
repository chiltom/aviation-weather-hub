import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signupUser } from "../utilities";

const Signup = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { setUser } = useOutletContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, email } = await signupUser(emailInput, passwordInput);
    if (user !== null && email !== null) {
      setUser({ user: user, email: email });
    }
  };

  return (
    <>
      <h2>Signup</h2>
    </>
  );
};

export default Signup;
