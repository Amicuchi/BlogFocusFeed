// Constante para a URL base da API
const API_BASE_URL = 'http://localhost:5000/api';

// Função auxiliar para obter o token de autenticação
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Função auxiliar para criar os headers da requisição
const createHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

export const postService = {
    async getPosts() {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`);
            if (!response.ok) throw new Error('Falha ao carregar posts');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
            throw error;
        }
    },

    async getPostById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`);
            if (!response.ok) throw new Error('Post não encontrado');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar post:', error);
            throw error;
        }
    },

    async createPost(postData) {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: 'POST',
                headers: createHeaders(true), // Inclui token de autenticação
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Falha ao criar post');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar post:', error);
            throw error;
        }
    },

    async updatePost(id, postData) {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                method: 'PUT',
                headers: createHeaders(true), // Inclui token de autenticação
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Falha ao atualizar post');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
            throw error;
        }
    },

    async deletePost(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: createHeaders(true), // Inclui token de autenticação
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Falha ao deletar post');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar post:', error);
            throw error;
        }
    }
};