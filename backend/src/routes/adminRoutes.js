import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";
import {
    updateUserRole,
    deletePost,
    deleteUser,
    listUsers,
    listPosts,
} from "../controllers/adminController.js";

const router = express.Router();

// Middleware para proteger rotas administrativas
// Com esse recurso, todas as rotas abaixo serão protegidas
router.use(authMiddleware);

// Rotas administrativas
router.put("/user/role", checkRole(["MODERATOR", "OWNER"]), updateUserRole);      // Rota para promover um usuário (qualquer nível)
router.delete("/user/:userId", checkRole(["OWNER"]), deleteUser);                 // Rota para excluir um usuário (posts permanecem) - Rota exclusiva para OWNER
router.delete("/post/:postId", checkRole(["MODERATOR", "OWNER"]), deletePost);    // Rota para excluir um post

// Rotas para as listagens
router.get("/allusers", checkRole(["MODERATOR", "OWNER"]), listUsers);        // Rota para listar todos os usuários com paginação
router.get("/allposts", checkRole(["MODERATOR", "OWNER"]), listPosts);        // Rota para listar todos os posts com paginação

export default router;