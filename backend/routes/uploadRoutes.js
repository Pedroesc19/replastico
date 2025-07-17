import express from "express";
import { upload } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se recibió ninguna imagen." });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

export default router;
