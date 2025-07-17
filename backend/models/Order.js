// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Opcional, según si usas auth
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true }, // Dirección de envío
  phone: { type: String, required: true }, // Teléfono
  instructions: { type: String }, // Instrucciones adicionales
  status: { type: String, default: "Pendiente" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
