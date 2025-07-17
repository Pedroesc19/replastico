// src/pages/ManageProducts.js
import React, { useEffect, useState } from "react";
import "../css/ManageProducts.css";
import ProductForm from "../components/ProductForm";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    setEditingProductId(id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" })
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

  const handleSuccess = () => {
    setEditingProductId(null);
    fetchProducts();
  };

  return (
    <div className="manage-products">
      <h1>Administrar Productos</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
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
            <p>{product.description}</p>
            <strong>${product.price}</strong>
            <div className="product-actions">
              <button onClick={() => handleEdit(product._id)}>Editar</button>
              <button onClick={() => handleDelete(product._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="product-form-section">
        <h2>{editingProductId ? "Editar Producto" : "Agregar Producto"}</h2>
        <ProductForm productId={editingProductId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default ManageProducts;
