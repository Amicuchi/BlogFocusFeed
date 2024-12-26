import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAuthorProfile,
  deleteUserProfile
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js'
import { userValidationSchema } from '../config/validation.js';

const router = express.Router();

// Rotas públicas
router.post('/register', validate(userValidationSchema.register), registerUser);
router.post('/login', validate(userValidationSchema.login), loginUser);
router.get('/author/:id', getAuthorProfile);

// Rotas protegidas
router.get('/user', authMiddleware, getUserProfile);
router.put('/user', authMiddleware, updateUserProfile);
router.delete('/user', authMiddleware, deleteUserProfile);

export default router;