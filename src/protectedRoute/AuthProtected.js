
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";
import PageNotFound from "../pages/PageNotFound";
const AuthProtected = () => {
  const currentUser = getCurrentUser()  
  return currentUser?.user? <Outlet /> : <PageNotFound/>;
  
}

export default AuthProtected




  
