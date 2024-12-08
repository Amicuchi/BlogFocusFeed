import Category from '../models/Category.js';
import Post from '../models/Post.js';

class CategoryService {
    async createCategory(categoryData) {
        // Check if category already exists
        const existingCategory = await Category.findOne(
            { name: categoryData.name }
        );
        
        if (existingCategory) throw new Error('Categoria já existe');

        const newCategory = new Category(categoryData);
        return await newCategory.save();
    }

    async getAllCategories() {
        return await Category.find();
    }

    async updateCategory(categoryId, updateData) {
        const category = await Category.findByIdAndUpdate(
            categoryId, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!category) throw new Error('Categoria não encontrada');

        return category;
    }

    async deleteCategory(categoryId) {
        // Check if category is used in any posts
        const postsWithCategory = await Post.countDocuments(
            { categories: categoryId }
        );

        if (postsWithCategory > 0) throw new Error('Não é possível excluir categoria em uso');

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) throw new Error('Categoria não encontrada');

        return { message: 'Categoria excluída com sucesso' };
    }
}

export default new CategoryService();