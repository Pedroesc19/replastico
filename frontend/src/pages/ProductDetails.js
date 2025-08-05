// src/pages/ProductDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/ProductDetails.css";
import Icon from "../icons/Icon";
import { Button, TextInput } from "../components/ui";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(50); // Valor predeterminado de compra mínima
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (quantity < 50) {
      setError("La compra mínima es de 50 unidades.");
      return;
    }
    addToCart(product, quantity);
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <div className="product-images">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}
      </div>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Precio: ${product.price}</p>
      <div className="purchase-info">
        <TextInput
          label="Cantidad (mínimo 50):"
          id="quantity"
          type="number"
          value={quantity}
          min={50}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        {error && <p className="error">{error}</p>}
        <Button onClick={handleAddToCart}>Añadir al carrito</Button>
      </div>
      <div className="additional-info">
        <p>
          <strong>Nota:</strong> La compra mínima para este producto es de 50
          unidades.
        </p>
      </div>
      <div className="reviews-section">
        <h2>Reseñas</h2>
        <div className="review">
          <div className="review-stars">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" />
            ))}
          </div>
          <p>"Excelente calidad y muy resistentes."</p>
          <span>- Juan Pérez</span>
        </div>
        <div className="review">
          <div className="review-stars">
            {[...Array(4)].map((_, i) => (
              <Icon key={i} name="star" />
            ))}
          </div>
          <p>"Perfectas para transportar frutas sin dañarlas."</p>
          <span>- María López</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
