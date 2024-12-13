import UserService from '../services/userService.js';

export const registerUser = async (req, res, next) => {
  try {
    const result = await UserService.registerUser(req.body);
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.status(200).json({
      message: 'Login realizado com sucesso',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    res.status(200).json({
      message: 'Perfil de usuário encontrado',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await UserService.updateUserProfile(
      req.user.id,
      req.body
    );
    res.status(200).json({
      message: 'Perfil de usuário atualizado',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    const user = await User.findById(userId).populate('posts'); // Certifique-se de que a relação 'posts' está configurada no modelo User
    // console.log(user.posts); // Console para verificar se os posts são populados corretamente

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(user.posts);
  } catch (error) {
    console.error('Erro ao buscar posts do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar posts do usuário.' });
  }
};