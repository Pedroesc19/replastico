import React from "react";
import "../css/AboutPage.css";

const AboutPage = () => {
  return (
    <section className="about-container grid cols-1">
      <div className="about-content">
        <h1 className="about-title">Sobre RePlastiCos</h1>

        <section className="about-block">
          <h2 className="about-subtitle">¿Quiénes Somos?</h2>
          <p className="about-description">
            En RePlastiCos fabricamos{" "}
            <strong>cajas plásticas reutilizables</strong> para frutas y
            verduras, pensadas para el transporte agrícola eficiente y
            sustentable.
          </p>
          <p className="about-description">
            Con foco en la <strong>economía circular</strong>, reducimos
            residuos y extendemos la vida útil de cada caja. Nuestros productos
            están diseñados para cuidar tanto los alimentos como el medio
            ambiente.
          </p>
        </section>

        <section className="about-block">
          <h2 className="about-subtitle">Nuestra Misión</h2>
          <p className="about-description">
            Fomentar una cadena de suministro agrícola más limpia mediante el
            uso de soluciones logísticas reutilizables, resistentes y 100%
            reciclables.
          </p>
        </section>

        <section className="about-block">
          <h2 className="about-subtitle">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Reciclaje</h3>
              <p>
                Las cajas están diseñadas para volver al ciclo productivo al
                finalizar su uso.
              </p>
            </div>
            <div className="value-item">
              <h3>Calidad</h3>
              <p>
                Materiales resistentes, seguros y aptos para entornos
                agroalimentarios.
              </p>
            </div>
            <div className="value-item">
              <h3>Innovación</h3>
              <p>
                Soluciones que responden a desafíos reales del campo y la
                distribución.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
