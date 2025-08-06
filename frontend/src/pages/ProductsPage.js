// src/pages/ProductsPage.js
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/ProductsPage.css";
import { Button, Card, CardGrid } from "../components/ui";

const ProductsPage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:5000/api/products?page=${page}&limit=${pageSize}`
        );
        const data = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (_err) {
        setError("Error al obtener productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, pageSize]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      selectedCategory ? p.category === selectedCategory : true
    )
    .filter((p) => p.price <= price);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="products-page grid cols-1">
      <div className="products-container">
        <h1>Productos</h1>
        <div className="controls-bar">
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="price-range">
            <label>Precio máx: ${price}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ordenar</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
            <option value="newest">Nuevos</option>
          </select>
        </div>
        {loading ? (
          <p className="spinner">Cargando...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : sorted.length > 0 ? (
          <CardGrid className="products-grid">
            {sorted.map((product) => (
              <Card key={product._id} className="product-card">
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
                <Button onClick={() => addToCart(product)}>
                  Añadir al carrito
                </Button>
              </Card>
            ))}
          </CardGrid>
        ) : (
          <p className="no-products">No hay productos disponibles.</p>
        )}
        <div className="pagination-controls">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>
          <span>
            Página {page} de {totalPages || 1}
          </span>
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
