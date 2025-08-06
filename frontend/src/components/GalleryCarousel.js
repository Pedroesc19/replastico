import React, { useEffect, useState } from "react";

const images = [
  {
    src: "https://via.placeholder.com/800x450?text=Evento+1",
    alt: "Equipo en evento 1",
  },
  {
    src: "https://via.placeholder.com/800x450?text=Evento+2",
    alt: "Equipo en evento 2",
  },
  {
    src: "https://via.placeholder.com/800x450?text=Instalaciones",
    alt: "Instalaciones de la empresa",
  },
];

const GalleryCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  const { src, alt } = images[current];

  return (
    <section className="gallery-section fade-in-section">
      <h2 className="section-title">Galería</h2>
      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={prev}
          aria-label="Imagen anterior"
        >
          &#8249;
        </button>
        <img src={src} alt={alt} loading="lazy" className="carousel-image" />
        <button
          className="carousel-button next"
          onClick={next}
          aria-label="Imagen siguiente"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default GalleryCarousel;
