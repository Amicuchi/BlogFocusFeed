import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  forgotPassword,
  resetPassword,
  resetPasswordWithToken,
} from "../controllers/passwordController.js";

const router = express.Router();

// Rota Pública
router.post("/forgot-password", forgotPassword);        // Solicitar redefinição de senha
router.post("/reset-password-with-token", resetPasswordWithToken); // Reset de senha através do token enviado

// Rota Protegida
router.post("/reset-password", authMiddleware, resetPassword); // Redefinir senha

export default router;
