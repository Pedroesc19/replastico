import React, { useState, useEffect, useId } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Navbar = ({ menuItems, showCart = false, cartCount = 0, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    handleLinkClick();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img src="/logo.svg" alt="RePlastiCos" className="logo" />
          <span className="brand-text"></span>
        </Link>
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          aria-controls={menuId}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true">
            <Bars3Icon width={24} height={24} />
          </span>
        </button>
        <nav className="navbar-menu">
          <ul id={menuId} className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {showCart && (
              <li>
                <NavLink to="/cart" onClick={handleLinkClick}>
                  <span className="cart-link-content">
                    Carrito
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </span>
                </NavLink>
              </li>
            )}
            {onLogout && (
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

Navbar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      end: PropTypes.bool,
    })
  ).isRequired,
  showCart: PropTypes.bool,
  cartCount: PropTypes.number,
  onLogout: PropTypes.func,
};

export default Navbar;
