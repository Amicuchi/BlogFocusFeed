import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async registerUser(userData) {
        const { username, email, password, fullName } = userData;

        // Verifica se o usuário já está cadastrado
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('Usuário já cadastrado');
        }

        // Rehash a senha recebida do frontend com bcrypt
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
            throw new Error('Credenciais inválidas');
        }

        // Compara a senha hasheada recebida com a armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciais inválidas');
        }

        // Gera o token JWT
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

    async getAuthorProfile(userId) {
        const user = await User.findById(userId)
            .select('fullName username profilePicture authorRole') // Seleciona apenas campos públicos
            .populate('posts', 'title'); // Opcional: incluir títulos dos posts, se necessário

        if (!user) throw new Error('Autor não encontrado');
        return user;
    }

    async updateUserProfile(userId, updates) {
        delete updates.password;
        // delete updates.email;

        // Lógica para evitar duplicidade de emails
        // Verifica se o email foi alterado e se já existe outro usuário com o novo email
        if (updates.email) {
            const emailExists = await User.findOne({ email: updates.email });
            if (emailExists) {
                throw new Error('Este e-mail já está em uso.');
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password'); // Removemos o campo senha da resposta

        return updatedUser;
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user;
    }
}

export default new UserService();