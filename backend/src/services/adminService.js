import User, { UserRoles } from "../models/User.js";
import Post from "../models/Post.js";

class AdminService {
    // Lista todos os usuários com paginação
    async listUsers(page = 1, limit = 10) {
        // Garantir que os parâmetros são válidos
        const parsedPage = Math.max(Number(page), 1);
        const parsedLimit = Math.max(Number(limit), 1);

        const skip = (parsedPage - 1) * parsedLimit;
        const users = await User.find()
            .select("-password -passwordResetToken -passwordResetExpires") // Evita retornar informações sensíveis
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parsedLimit);

        const total = await User.countDocuments();
        return {
            users,
            total,
            page: parsedPage,
            pages: Math.ceil(total / parsedLimit),
        };
    }

    // Atualiza o cargo de um usuário
    async updateUserRole(currentUserId, targetUserId, newRole) {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) throw new Error("Usuário não encontrado");

        if (targetUser.role === UserRoles.OWNER) {
            throw new Error("Não é possível alterar o cargo do proprietário");
        }

        // Valida a transição de cargo
        validateRoleTransition(newRole);

        const isOwner = currentUser.role === UserRoles.OWNER;
        const isModerator = currentUser.role === UserRoles.MODERATOR;

        if (isModerator) {
            if ([UserRoles.MODERATOR, UserRoles.OWNER].includes(newRole)) {
                throw new Error("Moderadores não podem promover usuários para Moderador ou Proprietário");
            }
            if ([UserRoles.MODERATOR, UserRoles.OWNER].includes(targetUser.role)) {
                throw new Error("Moderadores não podem alterar cargos de Moderadores ou Proprietários");
            }
        }

        if (!isOwner && !isModerator) {
            throw new Error("Você não tem permissão para alterar cargos");
        }

        // Permitir a mudança de cargo apenas se passar pelas validações acima
        targetUser.role = newRole;
        await targetUser.save();
        return targetUser;
    }

    // Exclui um usuário (somente proprietário)
    async deleteUser(userId) {
        const user = await User.findById(userId);

        if (!user) throw new Error("Usuário não encontrado");

        if (user.role === UserRoles.OWNER) {
            throw new Error("Não é possível excluir o proprietário");
        }

        await User.findByIdAndDelete(userId);
        return { message: "Usuário excluído com sucesso", user };
    }

// Lista todos os posts com paginação
async listPosts(page = 1, limit = 10) {
    const parsedPage = Math.max(Number(page), 1);
    const parsedLimit = Math.max(Number(limit), 1);

    const skip = (parsedPage - 1) * parsedLimit;
    const posts = await Post.find()
        .populate("author", "username fullName") // Inclui informações do autor
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit);

    const total = await Post.countDocuments();
    return {
        posts,
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit),
    };
}

// Exclui um post
async deletePost(postId) {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post não encontrado");
    }

    await post.remove();
    return { message: "Post excluído com sucesso", post };
}
}

// Função utilitária para validar transições de cargo
const validateRoleTransition = (role) => {
const validRoles = Object.values(UserRoles);
if (!validRoles.includes(role)) {
    throw new Error("Cargo inválido");
}
};

export default new AdminService();