import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/CartPage.css";
import { Button } from "../components/ui";

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


  return (
    <div className="cart-page grid cols-1">
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
                <Button
                  className="remove-button"
                  variant="danger"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${totalPrice}</h2>
            <Button className="checkout-button" onClick={handleCheckout}>
              Proceder a Pagar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
