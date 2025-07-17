import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

const GuestNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.svg" alt="RePlastiCos" className="logo" />
          <span className="brand-text"></span>
        </Link>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </button>
        <nav className="navbar-menu">
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">Nosotros</NavLink>
            </li>
            <li>
              <NavLink to="/products">Tienda</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Carrito</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contacto</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Registro</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default GuestNavbar;
