import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ReportPersonal from "../report/ReportPersonal";
import ReportPm from "../report/ReportPm";
import { USER_ROLES } from "../../constants/common";
import jwtDecode from "jwt-decode";
// import { useSelector } from "react-redux";

const Report = () => {
  const role = jwtDecode(localStorage.getItem("token")).role;
  return role !== USER_ROLES.DEV ? <ReportPm /> : <ReportPersonal />;
};

export default withHeaderHOC(Report);
