import { ReactElement, useEffect, useState } from "react";
import {
  NavigateFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useLocalStorage from "use-local-storage";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import { User, ContextType } from "./utilities/userUtilities";

function App(): ReactElement {
  // Gather preferred color scheme from user client's OS and set theme to that
  const defaultDark: boolean = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  /**
   * Gather loader data from useLoaderData() hook and store it
   * If the userData is an object and not null, set the user in
   * the state as a User
   * If the userData is null, set the user in the state as null
   */
  const userData = useLoaderData();
  const [user, setUser] = useState<User | null>(
    typeof userData === "object" && userData !== null
      ? (userData as User)
      : null
  );

  // Hooks to grab navigate function and locatoin function
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Should redirect to hompage if not logged in not visiting one of these urls,
    // or if logged in and trying to visit one of these urls
    const nullUserUrls: string[] = ["/login/", "/signup/", "/about/", "/"];
    // Check if current url is one that can be visited while not logged in
    const isNullAllowed: boolean = nullUserUrls.includes(location.pathname);
    // Not logged in user tries to go anywhere BUT signup or login
    // We redirect because the user needs to log in before they do anything else
    if (!user && !isNullAllowed) {
      navigate("/");
    }
    // Urls that a logged in user may visit
    const userUrls: string[] = [
      "/about/",
      "/",
      "/training/",
      "/workflow/",
      "/flights/",
      "/userinfo/",
    ];
    // Redirect to homepage when logged in user tries to go to signup, etc.
    const isSetAllowed: boolean = userUrls.includes(location.pathname);
    if (user && !isSetAllowed) {
      navigate("/");
    }
  }, [user, location.pathname]);

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
