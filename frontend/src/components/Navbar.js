// Navbar.js
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.svg" alt="RePlastiCos" className="logo" />
          <span className="brand-text"></span>
        </Link>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
            {userInfo && userInfo.role === "admin" && (
              <>
                <li>
                  <NavLink to="/manage-products">Administrar</NavLink>
                </li>
                <li>
                  <NavLink to="/admin">Dashboard</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/contact">Contacto</NavLink>
            </li>
            {!userInfo ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Registro</NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
