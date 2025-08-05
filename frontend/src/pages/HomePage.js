import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import { Button } from "../components/ui";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page grid cols-1">
      <section className="home-hero">
        <div className="home-overlay">
          <div className="home-content">
            <h1>Soluciones Sustentables para el Transporte Agrícola</h1>
            <p>
              RePlastiCos ofrece cajas de plástico reutilizables para frutas y
              verduras, ayudando a productores y empresas a reducir su huella
              ambiental.
            </p>
            <Button className="home-cta" onClick={() => navigate("/products") }>
              Ver Productos
            </Button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>¿Por qué elegir RePlastiCos?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Reutilizables</h3>
            <p>Diseñadas para durar, reducen el desperdicio y los costos.</p>
          </div>
          <div className="feature-card">
            <h3>Higiénicas</h3>
            <p>Fáciles de lavar, ideales para transportar alimentos frescos.</p>
          </div>
          <div className="feature-card">
            <h3>Sustentables</h3>
            <p>
              Fabricadas con materiales reciclables para un futuro más verde.
            </p>
          </div>
        </div>
      </section>

      <section className="preview-section">
        <h2>Nuestros Productos</h2>
        <p>
          Explora nuestras soluciones plásticas para cada etapa del transporte
          agrícola.
        </p>
        <div className="preview-gallery">
          <div className="preview-item">
            <img src="/imagenes/caja-estandar.jpg" alt="Caja estándar" />
            <p>Caja estándar</p>
          </div>
          <div className="preview-item">
            <img src="/imagenes/caja-ventilada.jpg" alt="Caja ventilada" />
            <p>Caja ventilada</p>
          </div>
          <div className="preview-item">
            <img src="/imagenes/caja-apilable.jpg" alt="Caja apilable" />
            <p>Caja apilable</p>
          </div>
        </div>
        <Button className="home-cta" onClick={() => navigate("/products") }>
          Ver catálogo completo
        </Button>
      </section>

      <section className="impact-section">
        <h2>Comprometidos con el medio ambiente</h2>
        <p>
          Cada caja reutilizable evita el uso de cientos de cajas de cartón al
          año. Con RePlastiCos, tú también puedes hacer la diferencia.
        </p>
      </section>

      <section className="cta-final">
        <h2>Únete al cambio</h2>
        <p>Regístrate ahora y comienza a transformar tu logística.</p>
        <Button className="home-cta" onClick={() => navigate("/register") }>
          Crear cuenta
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
