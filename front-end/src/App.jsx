import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";

function App() {
  // TODO: Uncomment loader when API is up
  const [user, setUser] = useState(useLoaderData());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Should redirect to hompage if logged in
    const nullUserUrls = ["/login/", "/signup/"];
    // Check if current url is one that might need to redirect
    let isAllowed = nullUserUrls.includes(location.pathname);
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
      <MyNavbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
