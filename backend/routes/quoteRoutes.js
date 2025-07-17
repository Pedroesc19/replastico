import express from "express";
import { generateQuote } from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", generateQuote);

export default router;
