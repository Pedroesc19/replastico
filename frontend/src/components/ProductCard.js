import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import Icon from "../icons/Icon";
import QuickViewModal from "./QuickViewModal";

function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "100px" });
    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  const handleWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!list.includes(product._id)) {
      localStorage.setItem("wishlist", JSON.stringify([...list, product._id]));
    }
  };

  const getBadge = () => {
    if (product.stock === 0) {
      return "Agotado";
    }
    if (product.onSale) {
      return "Oferta";
    }
    const created = new Date(product.createdAt);
    if (Date.now() - created.getTime() < 1000 * 60 * 60 * 24 * 30) {
      return "Nuevo";
    }
    return null;
  };

  const badge = getBadge();
  const rating = product.rating || 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="image-wrapper">
          {product.imageUrl ? (
            <img
              ref={imgRef}
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="product-image lazy"
            />
          ) : (
            <div className="no-image">Sin imagen</div>
          )}
          {badge && (
            <span className={`product-badge badge-${badge.toLowerCase()}`}>
              {badge}
            </span>
          )}
        </div>
        <h3>{product.name}</h3>
      </Link>
      <div className="product-rating" aria-label={`Calificación ${rating} de 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name="star"
            className={i < rating ? "star-icon filled" : "star-icon"}
            aria-hidden="true"
          />
        ))}
      </div>
      <button
        className="wishlist-btn"
        onClick={handleWishlist}
        aria-label={`Añadir ${product.name} a la lista de deseos`}
      >
        Añadir a la lista de deseos
      </button>
      <button
        ref={buttonRef}
        className="quick-view-btn"
        onClick={handleOpen}
        aria-label={`Vista rápida de ${product.name}`}
      >
        Vista rápida
      </button>
      <QuickViewModal product={product} isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default ProductCard;
