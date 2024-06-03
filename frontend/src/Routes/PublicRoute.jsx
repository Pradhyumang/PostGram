import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import { getCookie } from "../Cookie/cookie";
import { useEffect } from "react";
import "./public.css";
export const PublicRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const token = getCookie("accessToken");

  useEffect(() => {
    if ((isAuthenticated && token) || (!isAuthenticated && token)) {
      navigate("/home");
    }
  }, [navigate, isAuthenticated, token]);
  useEffect(() => {
    const rootElement = document.getElementById("root").parentElement;
    console.log(rootElement, "PublicRoute");
    if (rootElement) {
      rootElement.style.backgroundImage = token
        ? ""
        : "linear-gradient(to right, #2e3192, #1bffff)";
    }
  }, [token]);
  return <Outlet />;
};
