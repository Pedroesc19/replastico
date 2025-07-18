// src/pages/ProductsPage.js
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="products-page">
      <div className="products-container">
        <h1>Productos</h1>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image">Sin imagen</div>
                  )}
                  <h3>{product.name}</h3>
                </Link>
                <p>{product.description.substring(0, 50)}...</p>
                <strong>${product.price}</strong>
                <button onClick={() => addToCart(product)}>
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
