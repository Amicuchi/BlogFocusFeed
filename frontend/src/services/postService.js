export const postService = {
    async getPosts() {
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) throw new Error('Falha ao carregar posts');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
            throw error;
        }
    },

    async getPostById(id) {
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (!response.ok) throw new Error('Post não encontrado');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar post:', error);
            throw error;
        }
    },

    async createPost(postData) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) throw new Error('Falha ao criar post');
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar post:', error);
            throw error;
        }
    },

    async updatePost(id, postData) {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) throw new Error('Falha ao atualizar post');
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
            throw error;
        }
    },

    async deletePost(id) {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Falha ao deletar post');
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar post:', error);
            throw error;
        }
    }
};