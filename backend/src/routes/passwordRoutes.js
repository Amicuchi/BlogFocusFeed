import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);    // Solicitar redefinição de senha
router.post('/reset-password', resetPassword);      // Redefinir senha

export default router;