import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";


// Método que gera um token para redefinição de senha
export const generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  // const resetUrl = `${process.env.FRONTEND_URL}/reset-password-with-token?token=${resetToken}`;
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password-with-token/${resetToken}`;

  return { resetToken, user, resetUrl };
};


// Método que permite o usuário atualizar a senha depois de fazer login
export const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Senha atual incorreta");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
};


// Método que permite o usuário redefinir a senha através de um token
export const updatePasswordViaToken = async (token, newPassword) => {
  // Primeiro fazemos o hash do token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Buscar o usuário que tem esse token de reset
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Verificando se o token não expirou
  });

  if (!user) {
    throw new Error('Token inválido ou expirado');
  }

  // Gerando um salt para a nova senha
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.passwordResetToken = undefined; // Limpando o token de reset
  user.passwordResetExpires = undefined; // Limpando a expiração do token

  await user.save(); // Salvando a nova senha

  return user;
};
