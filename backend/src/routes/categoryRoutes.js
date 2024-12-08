import express from 'express';
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { categoryValidationSchema } from '../config/validation.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllCategories);

// Rotas protegidas (administrativas)
router.post('/', authMiddleware, validate(categoryValidationSchema.create), createCategory);
router.put('/:id', authMiddleware, validate(categoryValidationSchema.update), updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;