import express from "express";
import { getSummary } from "../controllers/adminController.js";

const router = express.Router();

router.get("/summary", getSummary);

export default router;
