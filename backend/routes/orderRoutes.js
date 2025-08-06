// backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  downloadOrdersExcel,
  updatePaymentStatus,
  quoteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/quote", quoteOrder);
// Ruta para crear un pedido
router.post("/", createOrder);
// Ruta para obtener pedidos (puedes protegerla según la autenticación)
router.get("/", getOrders);

router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/payment", updatePaymentStatus);

router.get("/download", downloadOrdersExcel);

export default router;
