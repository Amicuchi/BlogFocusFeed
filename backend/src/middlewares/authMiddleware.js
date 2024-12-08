import jwt from 'jsonwebtoken';

const validateToken = (token) => {
    if (!token) {
        throw new Error('Token não fornecido');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        throw new Error('Token inválido');
    }
};

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    try {
        req.user = validateToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default authMiddleware;