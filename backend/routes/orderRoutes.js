// backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  downloadOrdersExcel,
} from "../controllers/orderController.js";

const router = express.Router();

// Ruta para crear un pedido
router.post("/", createOrder);
// Ruta para obtener pedidos (puedes protegerla según la autenticación)
router.get("/", getOrders);

router.patch("/:id/status", updateOrderStatus);

router.get("/download", downloadOrdersExcel);

export default router;
