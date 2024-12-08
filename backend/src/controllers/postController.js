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
    const { page = 1, limit = 10, category, tag, query } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (tag) filters.tag = tag;
    if (query) filters.title = { $regex: query, $options: 'i' }; // Busca por título

    const posts = await PostService.getAllPosts(
      parseInt(page, 10),
      parseInt(limit, 10),
      filters
    );

    res.status(200).json(posts);
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



// export const searchPosts = async (req, res, next) => {
//   try {
//     const { category, page = 1, limit = 10 } = req.query;
//     const result = await PostService.searchPosts(
//       category,
//       parseInt(page, 10),
//       parseInt(limit, 10)
//     );
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

export const getUserPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await PostService.getPostsByUser(
      req.user.id,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};