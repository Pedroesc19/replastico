// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { downloadOrdersExcel } from "../controllers/orderController.js";

const router = express.Router();

// Ruta para crear un pedido
router.post("/", createOrder);
// Ruta para obtener pedidos (puedes protegerla según la autenticación)
router.get("/", getOrders);

router.get("/download", downloadOrdersExcel);

export default router;
