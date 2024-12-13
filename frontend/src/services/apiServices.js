import api from './api.js';

// Serviço centralizado
const apiServices = {
    // Usuário
    registerUser: (data) => api.post('/api/users/register', data),
    loginUser: (data) => api.post('/api/users/login', data),
    getUserProfile: () => api.get('/api/users/user'),
    updateUserProfile: (data) => api.put('/api/users/profile', data),

    // Posts
    getAllPosts: () => api.get('/api/posts'),
    getPostById: (id) => api.get(`/api/posts/${id}`),
    createPost: (data) => api.post('/api/posts', data),
    updatePost: (id, data) => api.put(`/api/posts/${id}`, data),
    deletePost: (id) => api.delete(`/api/posts/${id}`),

    // Busca Posts
    searchPosts: (query) => api.get(`/api/posts/search?query=${query}`),

    // Categorias
    getAllCategories: () => api.get('/api/categories'),
    createCategory: (data) => api.post('/api/categories', data),
    updateCategory: (id, data) => api.put(`/api/categories/${id}`, data),
    deleteCategory: (id) => api.delete(`/api/categories/${id}`),
};

export default apiServices;