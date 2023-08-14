import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";
const LoginProtection = () => {
  const currentUser = getCurrentUser();

  return !currentUser?.user ? <Outlet /> : <Navigate to={"/"} />;
};

export default LoginProtection;
