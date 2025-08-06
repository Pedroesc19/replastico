import React, { useEffect } from "react";
import MissionSection from "../components/MissionSection";
import VisionSection from "../components/VisionSection";
import ValuesSection from "../components/ValuesSection";
import TeamCard from "../components/TeamCard";
import teamMembers from "../data/teamMembers";
import CompanyTimeline from "../components/CompanyTimeline";
import ImpactStats from "../components/ImpactStats";
import GalleryCarousel from "../components/GalleryCarousel";
import JoinUs from "../components/JoinUs";
import "../css/AboutUs.css";

const AboutUs = () => {
  const banner = {
    desktop: "https://via.placeholder.com/1200x400",
    mobile: "https://via.placeholder.com/800x300"
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-container">
      <header
        className="header-banner fade-in-section"
        style={!banner ? { backgroundColor: "var(--color-background-light)" } : undefined}
      >
        {banner && (
          <picture>
            {banner.mobile && (
              <source
                srcSet={banner.mobile}
                media="(max-width: 600px)"
              />
            )}
            {banner.desktop && (
              <img src={banner.desktop} alt="Banner RePlastiCos" />
            )}
          </picture>
        )}
        <div className="header-text">
          <h1 className="header-title">Sobre RePlastiCos</h1>
          <p className="header-subtitle">
            Innovación sostenible para la logística agrícola
          </p>
          <a href="/contact" className="header-cta">
            Contáctanos
          </a>
        </div>
      </header>

      <div className="about-grid">
        <MissionSection />
        <VisionSection />
        <ValuesSection />
        <CompanyTimeline />
        <ImpactStats />
        <GalleryCarousel />
        <section className="team-section fade-in-section">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </section>
        <JoinUs />
      </div>
    </section>
  );
};

export default AboutUs;
