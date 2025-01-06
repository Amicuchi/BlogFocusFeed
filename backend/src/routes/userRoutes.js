import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserRole,
  getAuthorProfile,
  updateUserProfile,
  updateUserEmail,
  deleteOwnAccount
} from "../controllers/userController.js";
import { userValidationSchema } from "../config/validation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validationMiddleware.js";


const router = express.Router();

// Rotas públicas
router.post("/register", validate(userValidationSchema.register), registerUser);  // Rota para registrar um usuário
router.post("/login", validate(userValidationSchema.login), loginUser);           // Rota para logar um usuário
router.get("/author/:id", getAuthorProfile);                                      // Rota para pegar o perfil de um autor

// Rotas protegidas
router.get("/user", authMiddleware, getUserProfile);        // Rota para pegar o perfil do usuário logado
router.get("/user/role", authMiddleware, getUserRole);      // Rota para pegar o cargo do usuário logado
router.put("/user", authMiddleware, updateUserProfile);     // Rota para atualizar o perfil do usuário logado
router.put("/user/email", authMiddleware, updateUserEmail); // Rota para atualizar o e-mail do usuário logado
router.delete("/user", authMiddleware, deleteOwnAccount);   // Deletar própria conta

export default router;

