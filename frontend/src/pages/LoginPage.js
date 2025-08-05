import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/LoginPage.css";

import Icon from "../icons/Icon";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        setError(data.message || "Error al iniciar sesión.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Icon name="leaf" className="login-leaf-icon" />
          <h2>Bienvenido a RePlastiCos</h2>
          <p className="login-subtext">
            Accede para gestionar tus pedidos de envases plásticos.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-flex">
              <Icon name="envelope" className="flex-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-flex">
              <Icon name="lock" className="flex-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
              <span
                className="flex-icon clickable"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon name={showPassword ? "eyeSlash" : "eye"} />
              </span>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recuérdame
            </label>
            <a href="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

          <div className="login-footer">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
