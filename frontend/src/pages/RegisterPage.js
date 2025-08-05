import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import { Button, Card, Form, TextInput } from "../components/ui";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="register-page grid cols-1">
      <div className="hero-banner">
        <h1>Replasticos</h1>
        <p>Regístrate para gestionar tus pedidos de contenedores plásticos.</p>
      </div>
      <Card className="register-card">
        <h2>Crea tu cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        <Form onSubmit={handleRegister} className="form">
          <TextInput
            label="Nombre"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            required
          />
          <TextInput
            label="Correo electrónico"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="empresa@correo.com"
            required
          />
          <TextInput
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
          />
          <Button type="submit" className="register-button">
            Registrarme
          </Button>
        </Form>
        <div className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
