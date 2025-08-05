import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui";

const HeroCarousel = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    return () => observer.disconnect();
  }, [current]);

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.image.mobile} />
            <source media="(min-width: 769px)" srcSet={slide.image.desktop} />
            <img src={slide.image.desktop} alt={slide.alt} loading="lazy" />
          </picture>
          <div className="home-overlay">
            <div
              className="home-content fade-in-up"
              ref={index === current ? textRef : null}
            >
              <h1>{slide.heading}</h1>
              <p>{slide.text}</p>
              <Button
                className="home-cta"
                onClick={() => navigate(slide.ctaLink)}
              >
                {slide.ctaText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
