import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import WeatherPage from "./pages/WeatherPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { userConfirmation } from "./utilities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Uncomment loader when api is up
    // loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "weather/",
        element: <WeatherPage />,
      },
      {
        path: "signup/",
        element: <Signup />,
      },
      {
        path: "login/",
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
