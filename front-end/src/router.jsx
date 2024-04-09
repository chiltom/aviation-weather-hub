import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import Workflow from "./pages/Workflow";
import Training from "./pages/Training";
import Flights from "./pages/Flights";
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
        path: "training/",
        element: <Training />,
      },
      {
        path: "workflow/",
        element: <Workflow />,
      },
      {
        path: "flights/",
        element: <Flights />
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
