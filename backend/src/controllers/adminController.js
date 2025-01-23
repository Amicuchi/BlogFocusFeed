import AdminService from "../services/adminService.js";

//#region Lista todos os usuários com paginação
export const listUsers = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Valores padrão para paginação
    try {
        const users = await AdminService.listUsers(page, limit); // Chama o serviço com paginação
        res.status(200).json({
            message: "Usuários encontrados com sucesso",
            data: users,
        });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
};

//#region Atualiza o cargo de um usuário
export const updateUserRole = async (req, res, next) => {
    const { targetUserId, newRole } = req.body;
    const currentUserId = req.user.id;

    if (!targetUserId || !newRole) {
        return res.status(400).json({
            message: "ID do usuário e o novo cargo são obrigatórios.",
        });
    }

    try {
        const updatedUser = await AdminService.updateUserRole(currentUserId, targetUserId, newRole);
        res.status(200).json({
            message: "Cargo do usuário atualizado com sucesso",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

//#region Exclui um usuário
export const deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "ID do usuário é obrigatório." });
    }

    try {
        await AdminService.deleteUser(userId);
        res.status(200).json({
            message: "Usuário excluído com sucesso!",
        });
    } catch (error) {
        next(error);
    }
};

//#region Lista todos os posts com paginação
export const listPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Chama o serviço para listar posts
        const posts = await AdminService.listPosts(page, limit);
        res.status(200).json(posts);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

//#region Exclui um post
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Chama o serviço para excluir o post
        await AdminService.deletePost(postId);
        res.status(200).json({ message: "Post excluído com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};