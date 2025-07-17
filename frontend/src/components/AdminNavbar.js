import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const AdminNavbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
              <NavLink to="/">Inicio del Sitio</NavLink>
            </li>
            <li>
              <NavLink to="/manage-products">Administrar Productos</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Dashboard</NavLink>
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

export default AdminNavbar;
