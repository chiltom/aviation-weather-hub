import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import UserInfoForm from "../components/user/UserInfoForm";
import { ContextType, User } from "../types/userTypes";

/**
 * @description A page that displays the currently logged in User's
 * information and allows updates to their display name using the
 * UserInfoForm component.
 *
 * @returns {ReactElement} UserInfo Page.
 */
const UserInfo: React.FC = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  /**
   * @description Displays the current User's information in a ListGroup.
   *
   * @param {User} user The User that is currently logged in.
   *
   * @returns {ReactElement} The ListGroup that holds the current User's
   * information.
   */
  const renderUserInfo = (user: User): ReactElement => {
    return (
      <ListGroup className="mb-4 w-50">
        <ListGroup.Item>Display Name: {user.displayName}</ListGroup.Item>
        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
        <ListGroup.Item>
          Name: {user.firstName + " " + user.lastName}
        </ListGroup.Item>
      </ListGroup>
    );
  };

  return (
    <>
      <Container data-bs-theme={theme} className="flex flex-col">
        <Row>
          <h2 className="text-center">User Information</h2>
        </Row>
        <Row className="text-center d-flex justify-content-center mt-2">
          {user ? renderUserInfo(user) : null}
        </Row>
        <Row>
          <UserInfoForm user={user} setUser={setUser} theme={theme} />
        </Row>
      </Container>
    </>
  );
};

export default UserInfo;
