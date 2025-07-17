// backend/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct); // Protegido para admin
router.get("/:id", getProductById);
router.put("/:id", updateProduct); // Protegido para admin
router.delete("/:id", deleteProduct); // Protegido para admin

export default router;
