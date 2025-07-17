import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Si el registro es exitoso, redirigir al login
        navigate("/login", { state: { registered: true } });
      } else {
        setError(data.message || "Error al registrar el usuario");
      }
    } catch (err) {
      setError("Error en el registro. Intenta nuevamente.");
    }
  };

  return (
    <div className="register-page">
      <div className="hero-banner">
        <h1>Replasticos</h1>
        <p>Regístrate para gestionar tus pedidos de contenedores plásticos.</p>
      </div>
      <div className="register-card">
        <h2>Crea tu cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister} className="form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="empresa@correo.com"
              required
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
          <button type="submit" className="register-button">
            Registrarme
          </button>
        </form>
        <div className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
