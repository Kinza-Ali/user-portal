import { createBrowserRouter } from "react-router-dom";
import {Home} from "../pages/home";
import {Profile} from "../pages/profile";
import {ErrorScreen} from "../pages/error";

export const router = createBrowserRouter([
  {
    path: "/app/home",
    element: <Home/>,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/app/profile",
    element: <Profile/>,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorScreen />,
  },
]);