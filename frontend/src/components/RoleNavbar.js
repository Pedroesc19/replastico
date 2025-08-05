import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);

  if (!userInfo) {
    return <GuestNavbar />;
  }

  if (userInfo.role === "admin") {
    return <AdminNavbar onLogout={logout} />;
  }

  return <UserNavbar onLogout={logout} />;
};

Navbar.propTypes = {};

export default Navbar;
