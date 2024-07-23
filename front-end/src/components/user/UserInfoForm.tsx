import { FormEvent, FormEventHandler, ReactElement, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { changeUserInfo } from "../../utilities/userUtilities";
import { ContextType, User } from "../../types/userTypes";

/**
 * @description A component that serves as a Form to submit an update to a User's
 * display name.
 *
 * @prop {React.Dispatch<React.SetStateAction<User | null>>} setUser The setter
 * for the user state.
 * @prop {string} theme The theme of the User's OS.
 *
 * @returns {ReactElement} The UserInfoForm component.
 */
const UserInfoForm: React.FC<ContextType> = ({
  setUser,
  theme,
}: ContextType): ReactElement => {
  const [newDisplayNameInput, setNewDisplayNameInput] = useState<string>("");

  /**
   * @description Handles the request to change a User's display name.
   *
   * @param {FormEvent} e The form event.
   */
  const handleUserChangeRequest: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
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
            required
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
