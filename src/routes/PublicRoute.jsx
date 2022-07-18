import { Navigate, Outlet } from "react-router-dom";

function PublicRoute({ token }) {
  return !token ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRoute;
