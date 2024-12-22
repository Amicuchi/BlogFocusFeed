import {
  generateResetToken,
  updatePassword,
  updatePasswordViaToken,
} from "../services/passwordService.js";
import sendEmail from "../utils/sendEmail.js";

// Método que permite o usuário atualizar a senha depois de fazer login
export const resetPassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // A partir do token, você pode obter o ID do usuário
  try {
    await updatePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    next(error);
  }
};

// Método que gera um token para redefinição de senha e envia um e-mail com o link para redefinir a senha
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { resetToken, user, resetUrl } = await generateResetToken(email);

    const message = `
      Olá ${user.fullName},
      Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:
      ${resetUrl}
      Se você não solicitou isso, ignore este e-mail.
    `;

    await sendEmail(user.email, "Redefinição de Senha - FocusFeed", message);

    res
      .status(200)
      .json({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    next(error);
  }
};

// Método que permite o usuário redefinir a senha através de um token
export const resetPasswordWithToken = async (req, res, next) => {
  const { token, newPassword } = req.body; // Pegando o token e a nova senha do corpo da requisição

  try {
    const user = await updatePasswordViaToken(token, newPassword);
    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    next(error);
  }
};
