import { ReactElement, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useLocalStorage from "use-local-storage";
import "./App.css";
import MyNavbar from "./components/app/MyNavbar";
import { User, ContextType } from "./types/userTypes";

function App(): ReactElement {
  // Gather preferred color scheme from user client's OS and set theme to that
  const defaultDark: boolean = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage<string>(
    "theme",
    defaultDark ? "dark" : "light"
  );

  /**
   * Gather loader data from useLoaderData() hook and store it
   * If the userData is an object and not null, set the user in
   * the state as a User
   * If the userData is null, set the user in the state as null
   */
  const userData: object | unknown = useLoaderData();
  const [user, setUser] = useState<User | null>(
    typeof userData === "object" && userData !== null
      ? (userData as User)
      : null
  );

  return (
    <>
      <Container className="app px-4" data-theme={theme} fluid>
        <Row>
          <MyNavbar user={user} setUser={setUser} theme={theme} />
        </Row>
        <Row>
          <Outlet context={{ user, setUser, theme } satisfies ContextType} />
        </Row>
      </Container>
    </>
  );
}

export default App;
