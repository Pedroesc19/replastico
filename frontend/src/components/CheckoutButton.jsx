import React from "react";
import axios from "axios";
import { stripePromise } from "../lib/stripe";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function CheckoutButton({ label = "Buy Now" }) {
  const onClick = async () => {
    const stripe = await stripePromise;
    try {
      const { data } = await axios.post(`${API_BASE}/api/checkout/session`, {});
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) alert(error.message);
    } catch (err) {
      console.error("Checkout init failed:", err);
      alert("Unable to start checkout. Please try again.");
    }
  };

  return <button onClick={onClick}>{label}</button>;
}
