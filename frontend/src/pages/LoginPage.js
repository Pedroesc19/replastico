import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/LoginPage.css";

import Icon from "../icons/Icon";
import { Button, Card, Form, TextInput } from "../components/ui";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <Card className="login-card">
        <div className="login-header">
          <Icon name="leaf" className="login-leaf-icon" />
          <h2>Bienvenido a RePlastiCos</h2>
          <p className="login-subtext">
            Accede para gestionar tus pedidos de envases plásticos.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <Form onSubmit={handleLogin}>
          <TextInput
            label="Correo electrónico"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
          <TextInput
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
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
          <Button type="submit" className="login-button">
            Iniciar sesión
          </Button>
          <div className="login-footer">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
