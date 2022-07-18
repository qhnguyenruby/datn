import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { PAGE_URLS } from "../../constants/common";
import { getUserById } from "../../redux/action/userAction";

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(getUserById());
    // setUser(userState.user);
    // console.log("user: " + JSON.stringify(userState.user));
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    // navigate(PAGE_URLS.HOMEPAGE);
    window.location.reload(false);
  };

  return (
    <div>
      <div className="header-user">
        <img
          className="header-user-img"
          src={userState.user.avatarUrl}
          alt=""
          srcSet=""
        />
        <div className="header-user-name">{userState.user.userName}</div>
        <ArrowDropDownIcon
          onClick={handleSignOut}
          sx={{
            fontSize: 20,
            color: "white",
            paddingTop: 0.2,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Avatar;
