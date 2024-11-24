import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postService = {
  async getPosts(params = {}) {
    try {
      const response = await api.get('/posts', { params });
      return response.data;
    } catch (error) {
      throw new Error('Falha ao carregar posts', error.message);
    }
  },

  async getPostById(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar o post', error.message);
    }
  },

  async createPost(postData) {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar o post', error.message);
    }
  },

  async updatePost(id, postData) {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar o post', error.message);
    }
  },

  async deletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
    } catch (error) {
      throw new Error('Erro ao deletar o post', error.message);
    }
  }
};