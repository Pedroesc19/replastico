import React, { useContext } from "react";
import Modal from "./ui/Modal";
import { CartContext } from "../context/CartContext";

function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useContext(CartContext);
  if (!product) {
    return null;
  }

  const handleAdd = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="quick-view-content">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="product-image"
          />
        )}
        <h2 id="quick-view-title">{product.name}</h2>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
        <button
          onClick={handleAdd}
          aria-label={`Añadir ${product.name} al carrito`}
        >
          Añadir al carrito
        </button>
      </div>
    </Modal>
  );
}

export default QuickViewModal;
