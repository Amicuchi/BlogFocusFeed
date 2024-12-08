import Post from '../models/Post.js';
import User from '../models/User.js';

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

        const query = filters;

        if (filters.category) query.categories = filters.category;
        if (filters.tag) query.tags = filters.tag;

        const posts = await Post.find(query)
            .populate('author', 'username fullName')
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }); // Ordena por mais recentes

        const total = await Post.countDocuments(query);

        return {
            posts,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getPostById(postId) {
        const post = await Post
            .findById(postId)
            .populate('author', 'username fullName');

        if (!post) throw new Error('Post não encontrado');

        return post;
    }



    async updatePost(postId, userId, updateData) {
        const post = await Post.findById(postId);

        if (!post) throw new Error('Post não encontrado');

        if (post.author.toString() !== userId) throw new Error('Não autorizado a atualizar este post');

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

        if (!post) throw new Error('Post não encontrado');

        if (post.author.toString() !== userId) throw new Error('Não autorizado a excluir este post');

        await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(
            userId,
            { $pull: { posts: postId } }
        );

        return { message: 'Post excluído com sucesso' };
    }

    // async searchPosts(query, page = 1, limit = 10) {
    //     const searchQuery = {
    //         $or: [
    //             { title: { $regex: query, $options: 'i' } },
    //             { content: { $regex: query, $options: 'i' } },
    //             { tags: { $regex: query, $options: 'i' } }
    //         ]
    //     };

    //     const posts = await Post.find(searchQuery)
    //         .populate('author', 'username fullName')
    //         .limit(limit)
    //         .skip((page - 1) * limit)
    //         .sort({ createdAt: -1 });

    //     const total = await Post.countDocuments(searchQuery);

    //     return {
    //         posts,
    //         totalPages: Math.ceil(total / limit),
    //         currentPage: page
    //     };
    // }
}

export default new PostService();