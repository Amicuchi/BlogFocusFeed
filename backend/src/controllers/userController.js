import UserService from "../services/userService.js";

// Registrar novo usuário
export const registerUser = async (req, res, next) => {
    try {
        const result = await UserService.registerUser(req.body);
        res.status(201).json({
            message: "Usuário registrado com sucesso",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// Login de usuário
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await UserService.loginUser(email, password);
        res.status(200).json({
            message: "Login realizado com sucesso",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// Obter perfil do usuário logado
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await UserService.getUserProfile(req.user.id);
        res.status(200).json({
            message: "Perfil de usuário encontrado",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// Obter cargo do usuário logado
export const getUserRole = async (req, res, next) => {
    try {
        const user = await UserService.getUserRole(req.user.id);

        res.status(200).json({
            message: "Cargo de usuário encontrado",
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
};

// Obter perfil de autor
export const getAuthorProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getAuthorProfile(userId);
        res.status(200).json({
            message: "Perfil do autor encontrado",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// Atualizar perfil do usuário logado
export const updateUserProfile = async (req, res, next) => {
    try {
        const updatedUser = await UserService.updateUserProfile(
            req.user.id,
            req.body
        );
        res.status(200).json({
            message: "Perfil de usuário atualizado",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserEmail = async (req, res, next) => {
    try {
        const updatedUser = await UserService.updateUserEmail(
            req.user.id,
            req.body.email
        );
        res.status(200).json({
            message: "E-mail atualizado com sucesso",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

// Essa função é utilizada pelo usuário para exclusão de sua própria conta
export const deleteOwnAccount = async (req, res, next) => {
    try {
        await UserService.deleteOwnAccount(req.user.id);
        res.status(200).json({
            message: "Conta excluída com sucesso",
        });
    } catch (error) {
        next(error);
    }
};
