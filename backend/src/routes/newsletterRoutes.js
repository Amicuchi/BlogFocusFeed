import express from "express";
import newsletterController from "../controllers/newsletterController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.post("/subscribe", newsletterController.subscribe);              // Inscrever-se na newsletter
router.get("/unsubscribe/:token", newsletterController.unsubscribe);    // Cancelar inscrição

// Rotas protegidas (administrativas)
router.post("/send", authMiddleware, newsletterController.sendNewsletter);

export default router;