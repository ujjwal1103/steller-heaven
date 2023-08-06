import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";
const LoginProtection = () => {
  const currentUser = getCurrentUser();
  const location = useLocation();

  return !currentUser?.user ? <Outlet /> : <Navigate to={"/"} />;
};

export default LoginProtection;
