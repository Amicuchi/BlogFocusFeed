import PostService from '../services/postService.js';

export const createPost = async (req, res, next) => {
  try {
    const savedPost = await PostService.createPost(req.body, req.user.id);
    res.status(201).json({
      message: 'Post criado com sucesso',
      data: savedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      query,
      userId
    } = req.query;

    const filters = {};

    if (category) filters.category = category;                    // Filtra por categoria
    if (tag) filters.tag = tag;                                   // Filtra por tag
    if (query) filters.title = { $regex: query, $options: 'i' };  // Busca por título
    if (userId) filters.author = userId;                          // Filtra por autor

    // Validação dos parâmetros
    const pageNum = Math.max(1, parseInt(page, 10)); // Garante que página seja sempre >= 1
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10))); // Limita entre 1 e 50 itens

    const result = await PostService.getAllPosts(
      pageNum,
      limitNum,
      filters
    );

    // Adiciona informações de paginação no header
    res.set({
      'X-Total-Count': result.total,
      'X-Total-Pages': result.totalPages,
      'X-Current-Page': result.currentPage
    });
    
    res.status(200).json({
      data: result.posts,
      pagination: {
        total: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        limit: limitNum
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.status(200).json({
      message: 'Post encontrado',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const posts = await PostService.getPostsByCategory(categoryId);

    res.status(200).json({
      message: 'Posts filtrados pela categoria',
      data: posts
    });
  } catch (error) {
    console.error('Erro ao buscar posts por categoria:', error.message);
    res.status(500).json({ message: 'Erro ao buscar posts por categoria', error: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await PostService.updatePost(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(200).json({
      message: 'Post atualizado com sucesso',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const result = await PostService.deletePost(
      req.params.id,
      req.user.id
    );
    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

