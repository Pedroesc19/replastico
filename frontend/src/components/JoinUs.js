import React from "react";
import JoinUsForm from "./forms/JoinUsForm";

const JoinUs = () => {
  return (
    <section className="joinus-section fade-in-section">
      <h2 className="section-title">Únete a Nosotros</h2>
      <p className="section-text">
        Descubre oportunidades para ser parte de nuestro equipo.
      </p>
      <ul className="joinus-links">
        <li>
          <a href="/careers">Carreras</a>
        </li>
        <li>
          <a href="/volunteer">Voluntariado</a>
        </li>
      </ul>
      <JoinUsForm />
    </section>
  );
};

export default JoinUs;
