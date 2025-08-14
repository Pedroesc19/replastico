import React, { useState, useEffect, useId, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { Bars3Icon } from "@heroicons/react/24/solid";
import logo from "../logo.svg";

const Navbar = ({
  primaryItems,
  utilityItems = [],
  showCart = false,
  cartCount = 0,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const firstItemRef = useRef(null);
  const menuRef = useRef(null);
  const initialRender = useRef(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      if (!initialRender.current) {
        toggleRef.current?.focus();
      }
      return;
    }
    initialRender.current = false;
    firstItemRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll("a, button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    handleLinkClick();
  };

  const cartLabel = `Cart${cartCount > 0 ? `, ${cartCount} item${cartCount > 1 ? "s" : ""}` : ""}`;

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-container">
        <div className="navbar-brand-container">
          <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
            <img src={logo} alt="RePlastiCos logo" className="logo" />
          </Link>
          <button
            ref={toggleRef}
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
        </div>
        <nav
          id={menuId}
          ref={menuRef}
          className={`navbar-menu ${menuOpen ? "open" : ""}`}
        >
          <div className="navbar-primary-container">
            <ul className="navbar-primary">
              {primaryItems.map((item, index) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={handleLinkClick}
                    ref={index === 0 ? firstItemRef : null}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-utilities-container">
            <ul className="navbar-utilities">
              {utilityItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={handleLinkClick}
                    className={item.cta ? "navbar-cta" : undefined}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {showCart && (
                <li>
                  <NavLink
                    to="/cart"
                    onClick={handleLinkClick}
                    aria-label={cartLabel}
                  >
                    <span className="cart-link-content">
                      Carrito
                      {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                      )}
                      <span className="sr-only" aria-live="polite">
                        {`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
                      </span>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  primaryItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      end: PropTypes.bool,
    })
  ).isRequired,
  utilityItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      cta: PropTypes.bool,
    })
  ),
  showCart: PropTypes.bool,
  cartCount: PropTypes.number,
  onLogout: PropTypes.func,
};

export default Navbar;
