import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { postValidationSchema } from '../config/validation.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllPosts);
router.get('/search', getAllPosts);
router.get('/:id', getPostById);

// Rotas protegidas
router.post('/', authMiddleware, validate(postValidationSchema.create), createPost);
router.put('/:id', authMiddleware, validate(postValidationSchema.create), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;