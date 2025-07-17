import React, { useContext } from "react";
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

export default Navbar;
