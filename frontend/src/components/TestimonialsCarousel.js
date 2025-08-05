import React, { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Las cajas de RePlastiCos han mejorado nuestra logística.",
    author: "Juan Pérez",
    avatar: "/imagenes/avatar1.jpg",
  },
  {
    quote: "Excelente calidad y compromiso con el medio ambiente.",
    author: "María García",
    avatar: "/imagenes/avatar2.jpg",
  },
  {
    quote: "Un aliado clave en nuestra cadena de suministro.",
    author: "Luis Rodríguez",
    avatar: "/imagenes/avatar3.jpg",
  },
];

const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="testimonials-carousel">
      <div className="testimonial">
        <img
          src={current.avatar}
          alt={current.author}
          className="testimonial-avatar"
        />
        <p className="testimonial-quote">{current.quote}</p>
        <p className="testimonial-author">{current.author}</p>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
