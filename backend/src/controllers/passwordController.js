import { generateResetToken, updatePassword } from '../services/passwordService.js';
import sendEmail from '../utils/sendEmail.js';

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { resetToken, user, resetUrl } = await generateResetToken(email);

    const message = `
      Olá ${user.username},
      Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:
      ${resetUrl}
      Se você não solicitou isso, ignore este e-mail.
    `;

    await sendEmail(user.email, 'Redefinição de Senha - FocusFeed', message);

    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  try {
    await updatePassword(token, newPassword);
    res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    next(error);
  }
};
