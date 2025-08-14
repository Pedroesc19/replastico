import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../css/CheckoutForm.css";
import { Button, Card, Form, TextInput } from "../components/ui";
import CheckoutButton from "../components/CheckoutButton";

const CheckoutForm = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    shippingAddress: "",
    deliveryMethod: "standard",
    paymentMethod: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("checkoutData");
    if (saved) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name || "",
        email: userInfo.email || "",
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const payload = {
          products: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          deliveryMethod: formData.deliveryMethod,
        };
        const res = await fetch("http://localhost:5000/api/orders/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setQuote(data);
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };
    if (cartItems.length) {
      fetchQuote();
    }
  }, [cartItems, formData.deliveryMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, shippingAddress: value });
    fetchAddressSuggestions(value);
  };

  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setAddressSuggestions(data.map((item) => item.display_name));
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const selectAddress = (address) => {
    setFormData({ ...formData, shippingAddress: address });
    setAddressSuggestions([]);
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }
      if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
        newErrors.phone = "Teléfono inválido";
      }
    }
    if (step === 2 && !formData.shippingAddress) {
      newErrors.shippingAddress = "Dirección requerida";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    if (totalUnits < 50) {
      setErrors({ general: "La compra mínima es de 50 unidades." });
      return;
    }
    const orderData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      shippingAddress: formData.shippingAddress,
      phone: formData.phone,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
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
      .then(() => {
        localStorage.removeItem("checkoutData");
        navigate("/confirmation", {
          state: { success: true, message: "Pedido realizado con éxito" },
        });
        clearCart();
      })
      .catch((err) => {
        console.error("Error en el checkout:", err);
        setErrors({ general: "Ocurrió un error al procesar el pedido." });
      });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="checkout-form-container grid cols-1">
      <h1>Formulario de Pago</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      <Card className="order-summary">
        <h2>Resumen del Pedido</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - Cantidad: {item.quantity} - Subtotal: $
              {item.product.price * item.quantity}
            </li>
          ))}
        </ul>
        {quote && (
          <div className="quote">
            <p>Subtotal: ${quote.subtotal}</p>
            <p>Envío: ${quote.deliveryFee}</p>
            <p>Total estimado: ${quote.total}</p>
          </div>
        )}
        {!quote && <h3>Total: ${totalPrice}</h3>}
      </Card>
      {errors.general && <div className="error">{errors.general}</div>}
      <Form onSubmit={handleSubmit} className="checkout-form">
        {step === 1 && (
          <>
            <TextInput
              label="Nombre"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
            <TextInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <TextInput
              label="Teléfono"
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
            <TextInput
              label="Compañía"
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
            />
            <div className="form-actions">
              <Button type="button" onClick={nextStep}>
                Siguiente
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <TextInput
              label="Dirección de Envío"
              id="shippingAddress"
              name="shippingAddress"
              type="text"
              value={formData.shippingAddress}
              onChange={handleAddressChange}
              required
            />
            {errors.shippingAddress && (
              <div className="error">{errors.shippingAddress}</div>
            )}
            {addressSuggestions.length > 0 && (
              <ul className="suggestions">
                {addressSuggestions.map((addr) => (
                  <li key={addr} onClick={() => selectAddress(addr)}>
                    {addr}
                  </li>
                ))}
              </ul>
            )}
            <div className="form-group">
              <label htmlFor="deliveryMethod">Método de entrega</label>
              <select
                id="deliveryMethod"
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
              >
                <option value="standard">Estándar</option>
                <option value="express">Express</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Método de pago</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="credit">Tarjeta de crédito</option>
                <option value="bank">Transferencia bancaria</option>
              </select>
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
            <div className="form-actions">
              <Button type="button" onClick={prevStep}>
                Atrás
              </Button>
              <Button type="button" onClick={nextStep}>
                Siguiente
              </Button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Card className="review-card">
              <h2>Revisión</h2>
              <p>
                <strong>Nombre:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {formData.phone}
              </p>
              <p>
                <strong>Compañía:</strong> {formData.company}
              </p>
              <p>
                <strong>Dirección:</strong> {formData.shippingAddress}
              </p>
              <p>
                <strong>Método de entrega:</strong> {formData.deliveryMethod}
              </p>
              <p>
                <strong>Método de pago:</strong> {formData.paymentMethod || "No seleccionado"}
              </p>
            </Card>
            <div className="form-actions">
              <Button type="button" onClick={prevStep}>
                Atrás
              </Button>
              <CheckoutButton label="Confirmar Pedido" />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default CheckoutForm;
