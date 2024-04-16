import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Workflow from "./pages/Workflow";
import Training from "./pages/Training";
import Flights from "./pages/Flights";
import UserInfo from "./pages/UserInfo";
import { userConfirmation } from "./utilities/userUtilities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Uncomment loader when api is up
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        element: <Flights />,
      },
      {
        path: "userinfo/",
        element: <UserInfo />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
