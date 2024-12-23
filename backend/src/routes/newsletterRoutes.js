import express from "express";
import newsletterController from "../controllers/newsletterController.js";

const router = express.Router();

// Rotas públicas
router.post("/subscribe", newsletterController.subscribe);  // Inscrever-se na newsletter

export default router;
