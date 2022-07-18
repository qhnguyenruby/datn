import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ManagePage from "./ManagePage";
import { USER_ROLES } from "../../constants/common";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import jwtDecode from "jwt-decode";

const Manage = () => {
  const role = jwtDecode(localStorage.getItem("token")).role;

  return role === USER_ROLES.ADMIN ? (
    <ManagePage />
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "Lato",
        fontSize: "26px",
        fontWeight: "600",
        marginTop: "60px",
      }}
    >
      You don’t have permission to access this page, please contact
      administrator <PriorityHighIcon sx={{ fontSize: "34px" }} />
    </div>
  );
};

export default withHeaderHOC(Manage);
