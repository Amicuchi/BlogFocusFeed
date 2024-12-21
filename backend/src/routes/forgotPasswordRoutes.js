import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Modelo de usuário
import sendEmail from '../utils/sendEmail.js'; // Função para enviar e-mails

const router = express.Router();

// Rota: Solicitar redefinição de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const message = `
            Olá ${user.username},
            Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:
            ${resetUrl}
            Se você não solicitou isso, ignore este e-mail.
        `;

        await sendEmail(user.email, 'Redefinição de Senha - FocusFeed', message);

        res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar solicitação' });
    }
});

// Rota: Redefinir senha
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user || user.passwordResetToken !== token || Date.now() > user.passwordResetExpires) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao redefinir senha' });
    }
});

export default router;