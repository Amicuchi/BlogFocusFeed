import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async registerUser(userData) {
    const { username, email, password, fullName } = userData;

    // Verifica se o usuário já está cadastrado
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error("Usuário já cadastrado");
    }

    // Rehash a senha recebida do frontend com bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      fullName,
      password: hashedPassword,
      role: "READER", // Cargo padrão
    });

    await newUser.save();

    return {
      message: "Usuário cadastrado com sucesso",
      userId: newUser._id,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    // Compara a senha hasheada recebida com a armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Credenciais inválidas");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId)
      .select("-password")
      .populate("posts");

    if (!user) throw new Error("Usuário não encontrado");

    return user;
  }

  async getAuthorProfile(userId) {
    const user = await User.findById(userId)
      .select("fullName username profilePicture authorRole") // Seleciona apenas campos públicos
      .populate("posts", "title"); // Opcional: incluir títulos dos posts, se necessário

    if (!user) throw new Error("Autor não encontrado");
    return user;
  }

  async updateUserProfile(userId, updates) {
    delete updates.password;
    delete updates.email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password"); // Removemos o campo senha da resposta

    return updatedUser;
  }

  async updateUserEmail(userId, newEmail) {
    // Verifica se o e-mail já está em uso por outro usuário
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists && emailExists._id.toString() !== userId) {
      throw new Error("Este e-mail já está em uso.");
    }

    // Atualiza o e-mail do usuário
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { email: newEmail } },
      { new: true, runValidators: true }
    ).select("-password"); // Remove a senha da resposta

    return updatedUser;
  }

  async getAllUsers() {
    const users = await User.find()
      .select("-password -passwordResetToken -passwordResetExpires")
      .sort({ createdAt: -1 });
    return users;
  }

  async getUserRole(userId) {
    const user = await User.findById(userId).select("role");

    if (!user) throw new Error("Usuário não encontrado");

    return user;
  }

  // Função para alterar o cargo de um usuário
  async changeUserRole(currentUserId, targetUserId, newRole) {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);
  
    if (!targetUser) throw new Error("Usuário não encontrado");
    if (targetUser.role === UserRoles.OWNER) throw new Error("Não é possível modificar cargo do proprietário");
  
    const isOwner = currentUser.role === UserRoles.OWNER;
    const isModerator = currentUser.role === UserRoles.MODERATOR;
  
    if (isModerator) {
      if (newRole === UserRoles.MODERATOR || newRole === UserRoles.OWNER) {
        throw new Error("Moderadores não podem promover a Moderador ou Proprietário");
      }
      if (targetUser.role === UserRoles.MODERATOR || targetUser.role === UserRoles.OWNER) {
        throw new Error("Moderadores não podem alterar cargos de Moderadores ou Proprietários");
      }
    }
  
    targetUser.role = newRole;
    await targetUser.save();
    return targetUser;
  }

  // Exclusão pelo proprietário
  async deleteUserById(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.role === UserRoles.OWNER) throw new Error("Não é possível excluir o proprietário");

    await User.findByIdAndDelete(userId);
    return { message: "Usuário excluído com sucesso" };
  }

  // Exclusão da própria conta
  async deleteOwnAccount(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.role === UserRoles.OWNER) throw new Error("Proprietários devem transferir propriedade antes de excluir conta");
    
    await User.findByIdAndDelete(userId);
    return { message: "Conta excluída com sucesso" };
  }

}

export default new UserService();
