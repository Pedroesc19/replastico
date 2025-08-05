import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { useNavigate } from "react-router-dom";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products?popular=true")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="preview-section">
      <h2>Nuestros Productos</h2>
      <p>
        Explora nuestras soluciones plásticas para cada etapa del transporte agrícola.
      </p>
      {loading ? (
        <div className="preview-gallery">
          {[1, 2, 3].map((n) => (
            <div key={n} className="preview-item skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="preview-gallery">
          {products.slice(0, 3).map((product) => (
            <div
              key={product._id}
              className="preview-item"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <img
                src={product.image || "/imagenes/caja-estandar.jpg"}
                alt={product.name}
                loading="lazy"
              />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      )}
      <Button className="home-cta" onClick={() => navigate("/products")}>
        Ver catálogo completo
      </Button>
    </section>
  );
};

export default TopProducts;
