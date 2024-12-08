import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async registerUser(userData) {
        const { username, email, password, confirmPassword, fullName } = userData;

        if (password !== confirmPassword) {
            throw new Error('Senhas não coincidem');
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('Usuário já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            fullName,
            password: hashedPassword
        });

        await newUser.save();

        return {
            message: 'Usuário cadastrado com sucesso',
            userId: newUser._id
        };
    }

    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        };
    }

    async getUserProfile(userId) {
        const user = await User
            .findById(userId)
            .select('-password')
            .populate('posts');

        if (!user) throw new Error('Usuário não encontrado');

        return user;
    }

    async updateUserProfile(userId, updates) {
        delete updates.password;
        delete updates.email;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        return updatedUser;
    }
}

export default new UserService();