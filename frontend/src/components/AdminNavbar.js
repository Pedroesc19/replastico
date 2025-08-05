import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const menuItems = [
    { to: "/manage-products", label: "Administrar Productos" },
    { to: "/admin", label: "Dashboard" },
  ];

  return <Navbar menuItems={menuItems} onLogout={handleLogout} />;
};

AdminNavbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AdminNavbar;
