import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { CartContext } from "../context/CartContext";

const UserNavbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

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
              <NavLink to="/cart">
                <span className="cart-link-content">
                  Carrito
                  {cartItems.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contacto</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserNavbar;
