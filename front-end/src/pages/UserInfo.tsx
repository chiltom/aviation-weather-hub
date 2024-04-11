import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import UserInfoForm from "../components/UserInfoForm";
import { ContextType, User } from "../utilities";

const UserInfo = (): ReactElement => {
  const { user, setUser, theme } = useOutletContext<ContextType>();

  const renderUserInfo = (user: User): ReactElement => {
    return (
      <Col className="my-auto">
        <ListGroup className="mb-4 w-50">
          <ListGroup.Item>Display Name: {user.display_name}</ListGroup.Item>
          <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          <ListGroup.Item>
            Name: {user.first_name + " " + user.last_name}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    );
  };

  return (
    <>
      <Container data-bs-theme={theme} className="flex flex-col">
        <Row>
          <h2 className="text-center">User Information</h2>
        </Row>
        <Row className="text-center">{user ? renderUserInfo(user) : null}</Row>
        <Row>
          <UserInfoForm user={user} setUser={setUser} theme={theme} />
        </Row>
      </Container>
    </>
  );
};

export default UserInfo;
