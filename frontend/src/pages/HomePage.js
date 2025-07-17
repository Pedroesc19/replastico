import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="home-hero">
      <div className="home-overlay">
        <div className="home-content">
          <h1>Soluciones Sustentables para el Transporte Agrícola</h1>
          <p>
            RePlastiCos te ofrece cajas de plásticos reutilizables para frutas y
            verduras, ayudando a productores y empresas a reducir su huella
            ambiental.
          </p>
          <button className="home-cta" onClick={() => navigate("/products")}>
            Ver Productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
