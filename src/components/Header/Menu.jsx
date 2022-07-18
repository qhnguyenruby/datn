import { PAGE_URLS, USER_ROLES } from "../../constants/common";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const HEADER_MENU_USER = [
  { path: PAGE_URLS.HOMEPAGE, text: "Your Timer" },
  { path: PAGE_URLS.REPORT, text: "Report" },
];

const Menu = () => {
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : "";
  const location = useLocation();
  const pathname = `/${location.pathname.split("/")[1]}`;

  const [headerMenu, setHeaderMenu] = useState(HEADER_MENU_USER);
  useEffect(() => {
    if (role === USER_ROLES.ADMIN) {
      const headerMenuPm = [
        ...HEADER_MENU_USER,
        { path: PAGE_URLS.PROJECTS, text: "Projects" },
        { path: PAGE_URLS.MANAGE, text: "Manage" },
      ];
      setHeaderMenu(headerMenuPm);
    } else if (role === USER_ROLES.PM) {
      const headerMenuPm = [
        ...HEADER_MENU_USER,
        { path: PAGE_URLS.PROJECTS, text: "Projects" },
      ];
      setHeaderMenu(headerMenuPm);
    } else {
      setHeaderMenu(HEADER_MENU_USER);
    }
  }, [role]);

  return (
    <ul className="header-menu">
      {headerMenu.map((item, index) => (
        <li
          className={
            pathname === item.path
              ? "header-menu-item active"
              : "header-menu-item"
          }
          key={index}
        >
          <Link to={item.path}>{item.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
