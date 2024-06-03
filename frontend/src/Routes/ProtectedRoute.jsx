import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import { getCookie } from "../Cookie/cookie";
import { useEffect } from "react";
import "./protected.css";
export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const token = getCookie("accessToken");

  useEffect(() => {
    if ((!isAuthenticated && !token) || (isAuthenticated && !token)) {
      navigate("/");
    }
  }, [navigate, isAuthenticated, token]);
  useEffect(() => {
    const rootElement = document.getElementById("root").parentElement;
    console.log(rootElement);
    if (rootElement) {
      rootElement.style.backgroundImage = token
        ? "linear-gradient(to right, #09203F, #537895)"
        : "";
    }
  }, [token]);
  return <Outlet />;
};
