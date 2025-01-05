import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostByCategory,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validationMiddleware.js";
import { postValidationSchema } from "../config/validation.js";
import { UserRoles } from "../models/User.js";
import authorizeRole from "../middlewares/authorizeRoleMiddleware.js";

const router = express.Router();

// Rotas públicas
router.get("/", getAllPosts); // Todos os posts
router.get("/search", getAllPosts); // Pesquisa (ajustar para usar query params)
router.get("/:id", getPostById); // Detalhes de um post
router.get("/category/:categoryId", getPostByCategory); // Posts por categoria

// Rotas protegidas
router.post("/", authMiddleware, authorizeRole([UserRoles.AUTHOR, UserRoles.MODERATOR, UserRoles.OWNER]), validate(postValidationSchema.create), createPost );
router.put("/:id", authMiddleware, authorizeRole([UserRoles.AUTHOR, UserRoles.MODERATOR, UserRoles.OWNER]), validate(postValidationSchema.create), updatePost );
router.delete("/posts/:id", authMiddleware, authorizeRole([UserRoles.AUTHOR, UserRoles.MODERATOR, UserRoles.OWNER]), deletePost );

router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/dislike", authMiddleware, dislikePost);

export default router;
