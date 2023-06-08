import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);
