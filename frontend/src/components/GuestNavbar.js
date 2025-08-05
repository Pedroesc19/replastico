import React, { useContext } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { CartContext } from "../context/CartContext";

const GuestNavbar = () => {
  const { cartItems } = useContext(CartContext);

  const menuItems = [
    { to: "/", label: "Inicio", end: true },
    { to: "/about", label: "Nosotros" },
    { to: "/products", label: "Tienda" },
    { to: "/contact", label: "Contacto" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Registro" },
  ];

  return (
    <Navbar
      menuItems={menuItems}
      showCart
      cartCount={cartItems.length}
    />
  );
};

GuestNavbar.propTypes = {};

export default GuestNavbar;
