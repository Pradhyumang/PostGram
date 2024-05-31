import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthState";
import { getCookie } from "../Cookie/cookie";
import { useEffect } from "react";
export const PublicRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const token = getCookie("accessToken");

  useEffect(() => {
    if ((isAuthenticated && token) || (!isAuthenticated && token)) {
      navigate("/home");
    }
  }, [navigate, isAuthenticated, token]);
  return <Outlet />;
};
