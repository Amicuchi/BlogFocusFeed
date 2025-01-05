import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAuthorProfile,
  getUserRole,
  getAllUsers,
  updateUserProfile,
  updateUserEmail,
  changeUserRole,
  deleteUser,
  deleteOwnAccount
} from "../controllers/userController.js";
import { userValidationSchema } from "../config/validation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validationMiddleware.js";
import authorizeRole from "../middlewares/authorizeRoleMiddleware.js";
import { UserRoles } from "../models/User.js";

const router = express.Router();

// Rotas públicas
router.post("/register", validate(userValidationSchema.register), registerUser);  // Rota para registrar um usuário
router.post("/login", validate(userValidationSchema.login), loginUser);           // Rota para logar um usuário
router.get("/author/:id", getAuthorProfile);                                      // Rota para pegar o perfil de um autor

// Rotas protegidas
router.get("/user", authMiddleware, getUserProfile);          // Rota para pegar o perfil do usuário logado
router.get("/user/role", authMiddleware, getUserRole);        // Rota para pegar o cargo do usuário logado
router.get("/allusers", authMiddleware, authorizeRole([UserRoles.MODERATOR, UserRoles.OWNER]), getAllUsers);  // Rota para pegar todos os usuários

router.put("/user", authMiddleware, updateUserProfile);       // Rota para atualizar o perfil do usuário logado
router.put("/user/email", authMiddleware, updateUserEmail);   // Rota para atualizar o e-mail do usuário logado
router.put("/role", authMiddleware, authorizeRole([UserRoles.MODERATOR, UserRoles.OWNER]), changeUserRole);   // Rota para alterar o cargo de um usuário

router.delete("/user", authMiddleware, deleteOwnAccount); // Deletar própria conta
router.delete("/users/:userId", authMiddleware, authorizeRole([UserRoles.OWNER]), deleteUser); // Owner deleta outro usuário

export default router;