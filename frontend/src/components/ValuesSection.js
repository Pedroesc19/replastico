import React from "react";

const ValuesSection = () => {
  return (
    <section className="info-section fade-in-section">
      <h2 className="section-title">Nuestros Valores</h2>
      <ul className="values-list">
        <li>
          <strong>Reciclaje:</strong> Las cajas están diseñadas para volver al
          ciclo productivo al finalizar su uso.
        </li>
        <li>
          <strong>Calidad:</strong> Materiales resistentes, seguros y aptos para
          entornos agroalimentarios.
        </li>
        <li>
          <strong>Innovación:</strong> Soluciones que responden a desafíos reales
          del campo y la distribución.
        </li>
      </ul>
    </section>
  );
};

export default ValuesSection;
