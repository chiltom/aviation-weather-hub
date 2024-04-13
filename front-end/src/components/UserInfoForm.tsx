import { FormEventHandler, ReactElement, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ContextType, User, changeUserInfo } from "../utilities/userUtilities";

const UserInfoForm = ({ user, setUser, theme }: ContextType): ReactElement => {
  const [newDisplayNameInput, setNewDisplayNameInput] = useState<string>("");

  /**
   * Function that handles the submission of a display name change
   * from the user.
   *
   * Once the request is submitted, the function is called and it awaits
   * the return value of the promise from the api request in changeUserInfo.
   *
   * If a user is returned from the call it sets the user state in App.tsx.
   *
   * If null is returned, an alert saying the display name is already taken
   * is returned.
   * @param e
   */
  const handleUserChangeRequest: FormEventHandler<HTMLButtonElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    const user: User | null = await changeUserInfo(newDisplayNameInput);
    if (user !== null) {
      setUser(user);
      // console.log(user);
    } else {
      alert("Error changing display name, please try again.");
    }
  };

  return (
    <>
      <p className="text-center text-secondary">
        Here you can change your display name to any new, unique name.
      </p>
      <Form
        data-bs-theme={theme}
        onSubmit={handleUserChangeRequest}
        className="d-flex justify-content-center"
      >
        <InputGroup className="mb-3 w-75">
          <Form.Control
            onChange={(e) => setNewDisplayNameInput(e.target.value)}
            type="display_name"
            placeholder="Display name may only contain capital letters, lowercase letters, and the characters '.', '-', '_'"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default UserInfoForm;
