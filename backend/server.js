// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

// Usar rutas de producto
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend con ES Modules y Yarn funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
