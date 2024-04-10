import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import "./App.css";
import MyNavbar from "./components/MyNavbar";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  // TODO: Uncomment loader when API is up
  const [user, setUser] = useState(useLoaderData());
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: Update URLs that should only be allowed to visit if logged in
  // - Workflow
  // - Training
  useEffect(() => {
    // Should redirect to hompage if logged in
    const nullUserUrls = ["/login/", "/signup/", "/about/"];
    // Check if current url is one that might need to redirect
    const isAllowed = nullUserUrls.includes(location.pathname);
    console.log("is allowed: ", isAllowed);
    // Redirect to homepage when logged in user tries to go to signup, etc.
    if (user && isAllowed) {
      console.log("redirect to homepage");
      navigate("/");
    }
    // Not logged in user tries to go anywhere BUT signup or login
    // We redirect because the user needs to log in before they do anything else
    else if (!user && !isAllowed) {
      navigate("/");
    }
    console.log("user updated", user);
  }, [user, location.pathname]);

  return (
    <>
      <div className="app" data-theme={theme}>
        <MyNavbar user={user} setUser={setUser} theme={theme} />
        <Outlet context={{ user, setUser, theme }} />
      </div>
    </>
  );
}

export default App;
