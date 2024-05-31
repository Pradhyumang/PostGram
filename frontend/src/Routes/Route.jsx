import { createBrowserRouter } from "react-router-dom";

import SignIn from "../Pages/SignInOut/SignIn.jsx";
import SignUp from "../Pages/SignInOut/SignUp.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicRoute } from "./PublicRoute";
import Home from "./../Pages/Home/Home";
import NavbarRenderer from "../Pages/Home/NavbarRenderer.jsx";
import UserProfile from "./../Pages/UserProfile/UserProfile";
import CreatePost from "./../Pages/Home/Modal/CreatePost";
import ErrorPage from "./../Pages/ErrorPage";
export const routes = createBrowserRouter([
  {
    // path: "/",
    element: <PublicRoute />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        path: "/",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <NavbarRenderer />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/home/:search",
            element: <Home />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
