import React, { useContext } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { CartContext } from "../context/CartContext";

const GuestNavbar = () => {
  const { cartItems } = useContext(CartContext);

  const primaryItems = [
    { to: "/", label: "Inicio", end: true },
    { to: "/about", label: "Nosotros" },
    { to: "/products", label: "Tienda" },
    { to: "/contact", label: "Contacto" },
  ];

  const utilityItems = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Registro", cta: true },
  ];

  return (
    <Navbar
      primaryItems={primaryItems}
      utilityItems={utilityItems}
      showCart
      cartCount={cartItems.length}
    />
  );
};

GuestNavbar.propTypes = {};

export default GuestNavbar;
