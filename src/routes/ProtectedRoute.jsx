import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLES } from "../constants/common";
import JwtDecode from "jwt-decode";

function ProtectedRoute({ token }) {
  return JwtDecode(token).role !== USER_ROLES.DEV ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;
