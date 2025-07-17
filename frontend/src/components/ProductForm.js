import React, { useState, useEffect } from "react";
import "../css/ProductForm.css";

const ProductForm = ({ productId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  // Variable para almacenar el archivo de imagen
  const [file, setFile] = useState(null);

  // Si se pasa un productId, se obtienen los datos para editar
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:5000/api/products/${productId}`)
        .then((res) => res.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            setFormData(data);
          } catch (error) {
            console.error("Error al parsear JSON:", error);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // Guarda el archivo para subirlo más adelante
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si hay un archivo seleccionado, primero se sube la imagen
    if (file) {
      try {
        const uploadData = new FormData();
        uploadData.append("image", file);
        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        // Si todo va bien, asignamos la URL devuelta al campo imageUrl
        if (uploadJson.imageUrl) {
          formData.imageUrl = uploadJson.imageUrl;
        }
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
        // Opcional: mostrar error de subida y detener el envío del producto
        return;
      }
    }

    // Ahora enviamos los datos del producto (incluida la URL de la imagen) al backend
    const method = productId ? "PUT" : "POST";
    const url = productId
      ? `http://localhost:5000/api/products/${productId}`
      : "http://localhost:5000/api/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        onSuccess(data);
        // Reiniciar el formulario y limpiar archivo
        setFormData({ name: "", description: "", price: "", imageUrl: "" });
        setFile(null);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción del Producto</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
        </div>
        {/* Campo para subir imagen */}
        <div className="form-group">
          <label htmlFor="image">Subir Imagen del Producto</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-button">
          {productId ? "Actualizar" : "Crear"} Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
