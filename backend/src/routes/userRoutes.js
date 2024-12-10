import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserPosts,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js'
import { userValidationSchema } from '../config/validation.js';

const router = express.Router();

// Rotas públicas
router.post('/register', validate(userValidationSchema.register), registerUser);
router.post('/login', validate(userValidationSchema.login), loginUser);

// Rotas protegidas
router.get('/user', authMiddleware, getUserProfile);
router.put('/user', authMiddleware, updateUserProfile);
router.get('/user/posts', authMiddleware, getUserPosts);

export default router;