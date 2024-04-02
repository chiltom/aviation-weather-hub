import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import WeatherPage from "./pages/WeatherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
