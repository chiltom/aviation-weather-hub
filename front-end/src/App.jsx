import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";

function App() {
  // TODO: Uncomment loader when API is up
  const [user, setUser] = useState(useLoaderData());

  return (
    <>
      <MyNavbar user={user} setUser={setUser} />
      <Outlet context={setUser} />
    </>
  );
}

export default App;
