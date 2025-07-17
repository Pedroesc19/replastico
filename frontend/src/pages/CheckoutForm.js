import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/CheckoutForm.css";

const CheckoutForm = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    phone: "",
    instructions: "",
  });
  const [error, setError] = useState(null);

  // Función para calcular el total de la compra
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcular la cantidad total de unidades
    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Validar que la cantidad mínima sea 50
    if (totalUnits < 50) {
      setError("La compra mínima es de 50 unidades.");
      return;
    }

    // Prepara el objeto de la orden, agregando información extra
    const orderData = {
      shippingAddress: formData.shippingAddress,
      phone: formData.phone,
      instructions: formData.instructions,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/confirmation", {
          state: { success: true, message: "Pedido realizado con éxito" },
        });
        clearCart();
      })
      .catch((err) => {
        console.error("Error en el checkout:", err);
        setError("Ocurrió un error al procesar el pedido.");
      });
  };

  return (
    <div className="checkout-form-container">
      <h1>Formulario de Pago</h1>
      <div className="order-summary">
        <h2>Resumen del Pedido</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - Cantidad: {item.quantity} - Subtotal: $
              {item.product.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice}</h3>
      </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="shippingAddress">Dirección de Envío</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">
            Instrucciones Adicionales (opcional)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
