import PropTypes from "prop-types";
import AuthContext from "./Context";
import { getCookie } from "../Cookie/cookie";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSignInMutation } from "../Store/api/signInApi";
import { toast } from "react-toastify";
export const AuthProvider = ({ children }) => {
  //  API sign In
  const [signIn, { error, isLoading, isSuccess }] = useSignInMutation();

  //Global state
  const isAuthenticated = useSelector(
    (state) => state.persistedReducer.auth.isAuthenticated
  );
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    if (isSuccess) {
      toast.success("login Successfull");
    } else if (error) {
      toast.error("Invalid Credential ");
    }
  }, [isSuccess, error]);
  if (isLoading) return <div>Loading...</div>;

  const login = async (payload) => {
    return await signIn(payload);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
