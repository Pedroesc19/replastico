import React from "react";
import Icon from "../icons/Icon";

const milestones = [
  { year: 2019, text: "Fundación de RePlastiCos" },
  { year: 2021, text: "Primer proyecto internacional" },
  { year: 2023, text: "Inauguración de nueva planta" },
];

const CompanyTimeline = () => {
  return (
    <section className="timeline-section fade-in-section">
      <h2 className="section-title">Nuestra Historia</h2>
      <ol className="timeline" aria-label="Línea de tiempo de hitos de la empresa">
        {milestones.map(item => (
          <li key={item.year} className="timeline-item">
            <Icon name="leaf" className="timeline-icon" aria-hidden="true" />
            <time className="timeline-year">{item.year}</time>
            <p className="timeline-text">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CompanyTimeline;
