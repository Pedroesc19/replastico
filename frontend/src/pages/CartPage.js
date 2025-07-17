import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Redirecciona a la página de checkout para que el usuario complete el formulario de pago.
    navigate("/checkout");
  };

  const handleGenerateQuote = () => {
    fetch("http://localhost:5000/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "cotizacion.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => console.error("Error generating quote:", err));
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">El carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.product.price}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${totalPrice}</h2>
            <button className="quote-button" onClick={handleGenerateQuote}>
              Generar Cotización
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceder a Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
