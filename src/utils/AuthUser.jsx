import { Navigate, Outlet } from "react-router-dom";
import { getDecodedData } from "./encryptDecrypt";

const AuthUser = () => {
  const token = getDecodedData("authToken");

  if (!token) {
    // Redirect to login if there is no tkn
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;// If there is tkn, then render the child routes
};

export default AuthUser;
