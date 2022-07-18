import { PAGE_URLS } from "../../constants/common";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./index.scss";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="header">
      <Link to={PAGE_URLS.HOMEPAGE} className="header-logo">
        <img
          className="header-logo-img"
          src={require("../../assets/images/element_logo_icon-white.png")}
          alt=""
          srcSet=""
        />
        <span
          style={{
            fontSize: "21px",
            fontWeight: "bold",
            marginLeft: "20px",
            color: "white",
          }}
        >
          TCloud
        </span>
      </Link>
      <Menu />
      <Avatar />
    </header>
  );
};

export default Header;
