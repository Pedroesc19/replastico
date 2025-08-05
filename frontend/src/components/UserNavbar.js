import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { CartContext } from "../context/CartContext";

const UserNavbar = ({ onLogout }) => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const menuItems = [
    { to: "/", label: "Inicio", end: true },
    { to: "/about", label: "Nosotros" },
    { to: "/products", label: "Tienda" },
    { to: "/contact", label: "Contacto" },
  ];

  return (
    <Navbar
      menuItems={menuItems}
      showCart
      cartCount={cartItems.length}
      onLogout={handleLogout}
    />
  );
};

UserNavbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserNavbar;
