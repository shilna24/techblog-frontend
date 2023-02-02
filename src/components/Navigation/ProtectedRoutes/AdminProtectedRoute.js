import { useSelector } from "react-redux";
import { Navigate, Outlet,  } from "react-router-dom";

//check if  admin is loggin

const AdminProtectRoute = () => {
  const admin = useSelector((state) => state.users);
  const { adminAuth } = admin;
  const isAdmin = adminAuth?.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default AdminProtectRoute;