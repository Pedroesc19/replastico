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

  const primaryItems = [
    { to: "/manage-products", label: "Administrar Productos" },
    { to: "/admin", label: "Dashboard" },
  ];

  return (
    <Navbar
      primaryItems={primaryItems}
      utilityItems={[]}
      onLogout={handleLogout}
    />
  );
};

AdminNavbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AdminNavbar;
