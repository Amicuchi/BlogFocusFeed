import jwt from "jsonwebtoken";

const validateToken = (token) => {
    if (!token) {
        throw new AuthError("Token não fornecido");
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AuthError("Token expirado", 401);
        }
        throw new AuthError("Token inválido", 401);
    }
};

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
        const decoded = validateToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Erro na autenticação:", error.message);
        res.status(error.statusCode || 401).json({ message: error.message });
    }
};

export default authMiddleware;