import React, { useState } from "react";
import Modal from "./ui/Modal";
import { Button } from "./ui";

const PromoVideoSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="promo-section">
      <h2>Conoce más</h2>
      <Button className="home-cta" onClick={() => setOpen(true)}>
        Ver Video
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <video controls width="560">
          <source src="/videos/promo.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </Modal>
    </section>
  );
};

export default PromoVideoSection;
