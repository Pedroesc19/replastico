import React, { useEffect, useState } from "react";

const stats = [
  { label: "Años de operación", value: 5 },
  { label: "Proyectos completados", value: 150 },
];

const ImpactStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = stat.value / 100;
      return setInterval(() => {
        setCounts(prev => {
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
    <section className="impact-stats fade-in-section">
      <div className="impact-stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="impact-stat">
            <span className="impact-stat-number">{counts[i]}</span>
            <span className="impact-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
