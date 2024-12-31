import Post from "../models/Post.js";
import User from "../models/User.js";

class PostService {
  async createPost(postData, userId) {
    const description = postData.content.substring(0, 200);

    const newPost = new Post({
      ...postData,
      description,
      author: userId,
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: savedPost._id } }
    );

    return savedPost;
  }

  async getAllPosts(page = 1, limit = 10, filters = {}) {
    try {
      const query = filters;
      if (filters.category) query.categories = filters.category;
      if (filters.tag) query.tags = filters.tag;
      if (filters.userId) query.author = filters.userId;

      // Executa as queries em paralelo para melhor performance
      const [posts, total] = await Promise.all([
        Post.find(query)
          .skip((page - 1) * limit)
          .populate("author", "username fullName")
          .limit(limit)
          .sort({ createdAt: -1 }),
        Post.countDocuments(query),
      ]);

      return {
        posts,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Erro ao buscar posts: ${error.message}`);
    }
  }

  async getPostById(postId) {
    const post = await Post
      .findByIdAndUpdate(postId)
      .populate(
        "author",
        "username fullName"
      );

    if (!post) throw new Error("Post não encontrado");

    post.views += 1;
    await post.save();
    // await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    return post;
  }

  async getPostsByCategory(categoryId) {
    const posts = await Post.find({ categories: categoryId })
      .populate("author", "username fullName") // Popula dados do autor
      .sort({ createdAt: -1 }); // Ordena por mais recentes

    if (!posts.length)
      throw new Error("Nenhum post encontrado para esta categoria");

    return posts;
  }

  async updatePost(postId, userId, updateData) {
    const post = await Post.findById(postId);

    if (!post) throw new Error("Post não encontrado");

    if (post.author.toString() !== userId)
      throw new Error("Não autorizado a atualizar este post");

    const description = updateData.content
      ? updateData.content.substring(0, 200)
      : post.description;

    return Post.findByIdAndUpdate(
      postId,
      { ...updateData, description },
      { new: true }
    );
  }

  async deletePost(postId, userId) {
    const post = await Post.findById(postId);

    if (!post) throw new Error("Post não encontrado");

    if (post.author.toString() !== userId)
      throw new Error("Não autorizado a excluir este post");

    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

    return { message: "Post excluído com sucesso" };
  }

  async handleInteraction(postId, userId, interactionType) {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post não encontrado");

    const existingInteraction = post.interactions.find(
      i => i.userId.toString() === userId && i.type === interactionType
    );

    if (existingInteraction) {
      // Remove interação existente
      post.interactions = post.interactions.filter(
        i => !(i.userId.toString() === userId && i.type === interactionType)
      );
      if (interactionType === 'like') post.likes--;
      if (interactionType === 'dislike') post.dislikes--;
    } else {
      // Remove interação oposta se existir
      const oppositeType = interactionType === 'like' ? 'dislike' : 'like';
      const hasOpposite = post.interactions.find(
        i => i.userId.toString() === userId && i.type === oppositeType
      );

      if (hasOpposite) {
        post.interactions = post.interactions.filter(
          i => !(i.userId.toString() === userId && i.type === oppositeType)
        );
        if (oppositeType === 'like') post.likes--;
        if (oppositeType === 'dislike') post.dislikes--;
      }

      // Adiciona nova interação
      post.interactions.push({ userId, type: interactionType });
      if (interactionType === 'like') post.likes++;
      if (interactionType === 'dislike') post.dislikes++;
    }

    return post.save();
  }

}

export default new PostService();
