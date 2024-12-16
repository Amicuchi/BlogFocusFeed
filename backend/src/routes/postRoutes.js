import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostByCategory,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { postValidationSchema } from '../config/validation.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllPosts);                           // Todos os posts
router.get('/search', getAllPosts);                     // Pesquisa (ajustar para usar query params)
router.get('/:id', getPostById);                        // Detalhes de um post
router.get('/category/:categoryId', getPostByCategory); // Posts por categoria

// Rotas protegidas
router.post('/', authMiddleware, validate(postValidationSchema.create), createPost);    // Criar post
router.put('/:id', authMiddleware, validate(postValidationSchema.create), updatePost);  // Atualizar post
router.delete('/posts/:id', authMiddleware, deletePost);                                // Deletar post

export default router;