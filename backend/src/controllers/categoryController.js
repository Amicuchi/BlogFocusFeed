import CategoryService from '../services/categoryService.js';

export const createCategory = async (req, res, next) => {
    try {
        const savedCategory = await CategoryService.createCategory(req.body);
        res.status(201).json({
            message: 'Categoria criada com sucesso',
            data: savedCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json({
            message: 'Categorias encontradas',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(
            req.params.id,
            req.body
        );
        res.status(200).json({
            message: 'Categoria atualizada com sucesso',
            data: updatedCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const result = await CategoryService.deleteCategory(req.params.id);
        res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};