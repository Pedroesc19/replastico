import React, { useEffect, useState } from "react";

const stats = [
  { label: "Cajas recicladas", value: 50000 },
  { label: "Clientes atendidos", value: 120 },
  { label: "Años de experiencia", value: 10 },
];

const StatsSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = stat.value / 100;
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(
            stat.value,
            Math.ceil(newCounts[index] + increment)
          );
          return newCounts;
        });
      }, 20);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stat">
            <span className="stat-number">{counts[i].toLocaleString()}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
