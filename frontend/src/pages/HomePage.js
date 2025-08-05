import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import { Button } from "../components/ui";
import Icon from "../icons/Icon";
import HeroCarousel from "../components/HeroCarousel";

const slides = [
  {
    image: {
      mobile: "/imagenes/cajasdeplasticohome.jpg",
      desktop: "/imagenes/cajasdeplasticohome.jpg",
    },
    heading: "Soluciones Sustentables para el Transporte Agrícola",
    text: "RePlastiCos ofrece cajas de plástico reutilizables para frutas y verduras, ayudando a productores y empresas a reducir su huella ambiental.",
    ctaText: "Ver Productos",
    ctaLink: "/products",
    alt: "Cajas de plástico reutilizables",
  },
  {
    image: {
      mobile: "/imagenes/reciclaje.jpg",
      desktop: "/imagenes/reciclaje.jpg",
    },
    heading: "Economía circular para tu negocio",
    text: "Opta por soluciones que cuidan el planeta y prolongan la vida útil de tus envases.",
    ctaText: "Saber más",
    ctaLink: "/about",
    alt: "Proceso de reciclaje",
  },
];

const features = [
  {
    title: "Reutilizables",
    text: "Diseñadas para durar, reducen el desperdicio y los costos.",
    icon: "star",
  },
  {
    title: "Higiénicas",
    text: "Fáciles de lavar, ideales para transportar alimentos frescos.",
    icon: "lock",
  },
  {
    title: "Sustentables",
    text: "Fabricadas con materiales reciclables para un futuro más verde.",
    icon: "leaf",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const featureRefs = useRef([]);

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
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page grid cols-1">
      <HeroCarousel slides={slides} />

      <section className="features-section">
        <h2>¿Por qué elegir RePlastiCos?</h2>
        <div className="features">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card fade-in-up"
              ref={(el) => (featureRefs.current[index] = el)}
            >
              <Icon name={feature.icon} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="preview-section">
        <h2>Nuestros Productos</h2>
        <p>
          Explora nuestras soluciones plásticas para cada etapa del transporte
          agrícola.
        </p>
        <div className="preview-gallery">
          <div className="preview-item">
            <picture>
              <source
                srcSet="/imagenes/caja-estandar.jpg"
                media="(min-width: 769px)"
              />
              <img
                src="/imagenes/caja-estandar.jpg"
                alt="Caja estándar"
                loading="lazy"
              />
            </picture>
            <p>Caja estándar</p>
          </div>
          <div className="preview-item">
            <picture>
              <source
                srcSet="/imagenes/caja-ventilada.jpg"
                media="(min-width: 769px)"
              />
              <img
                src="/imagenes/caja-ventilada.jpg"
                alt="Caja ventilada"
                loading="lazy"
              />
            </picture>
            <p>Caja ventilada</p>
          </div>
          <div className="preview-item">
            <picture>
              <source
                srcSet="/imagenes/caja-apilable.jpg"
                media="(min-width: 769px)"
              />
              <img
                src="/imagenes/caja-apilable.jpg"
                alt="Caja apilable"
                loading="lazy"
              />
            </picture>
            <p>Caja apilable</p>
          </div>
        </div>
        <Button className="home-cta" onClick={() => navigate("/products")}>
          Ver catálogo completo
        </Button>
      </section>

      <section className="impact-section">
        <h2>Comprometidos con el medio ambiente</h2>
        <p>
          Cada caja reutilizable evita el uso de cientos de cajas de cartón al
          año. Con RePlastiCos, tú también puedes hacer la diferencia.
        </p>
      </section>

      <section className="cta-final">
        <h2>Únete al cambio</h2>
        <p>Regístrate ahora y comienza a transformar tu logística.</p>
        <Button className="home-cta" onClick={() => navigate("/register")}>
          Crear cuenta
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
