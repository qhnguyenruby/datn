import { PAGE_URLS } from "../constants/common";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ token }) {
  if (!token) {
    return <Navigate to={PAGE_URLS.LOGIN} />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
