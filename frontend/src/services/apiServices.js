import api from "./api.js";

// Serviço centralizado
const apiServices = {
  // Usuário
  registerUser: (data) => api.post("/api/users/register", data),        // Registro de usuário
  loginUser: (data) => api.post("/api/users/login", data),              // Login de usuário
  getUserRole: () => api.get("/api/users/user/role"),                   // Obter cargo do usuário
  getUserProfile: () => api.get("/api/users/user"),                     // Obter perfil do usuário
  getAuthorProfile: (userId) => api.get(`/api/users/author/${userId}`), // Obter perfil de autor
  updateUserProfile: (data) => api.put("/api/users/user", data),        // Atualizar perfil do usuário
  ownerDeleteUser: (userId) => api.delete(`/api/users/${userId}`),      // Proprietário exclui a conta do usuário

  // Admin
  listUsers: (page = 1, limit = 10) => api.get(`/api/admin/allusers?page=${page}&limit=${limit}`),          // Obter todos os usuários
  updateUserRole: (targetUserId, newRole) => api.put("/api/admin/user/role", { targetUserId: targetUserId, newRole: newRole }),  // Alterar cargo do usuário
  deleteUser: (userId) => api.delete(`/api/admin/user/${userId}`),                                          // Excluir usuário pelo ID
  listPosts: (page = 1, limit = 10) => api.get(`/api/admin/allposts?page=${page}&limit=${limit}`),          // Obter todos os posts
  adminDeletePost: (postId) => api.delete(`/api/admin/post/${postId}`),                                     // Excluir post pelo ID

  // Contato
  sendContactMessage: (formData) => api.post("/api/contact/contact", formData), // Enviar mensagem

  // Autenticação
  forgotPassword: async (email) => api.post("/api/auth/forgot-password", { email }),                                                            // Solicitar redefinição de senha
  resetPassword: async (token, currentPassword, newPassword) => api.post("/api/auth/reset-password", { token, currentPassword, newPassword, }), // Redefinição de senha
  resetPasswordWithToken: async (token, newPassword) => api.post("/api/auth/reset-password-with-token", { token, newPassword }),                // Redefinição de senha com token

  // Posts
  createPost: (data) => api.post("/api/posts", data),                               // Criar novo post
  getPostById: (id) => api.get(`/api/posts/${id}`),                                 // Obter detalhes de um post
  getPostsByAuthor: (userId) => api.get(`/api/posts?userId=${userId}`),             // Obter posts de um autor
  getPostsByCategory: (categoryId) => api.get(`/api/posts/category/${categoryId}`), // Obter posts por categoria
  getAllPosts: (params) => api.get("/api/posts", { params }),                       // Obter todos os posts
  searchPosts: (query) => api.get(`/api/posts/search?query=${query}`),              // Buscar posts por termo de busca  
  updatePost: (id, data) => api.put(`/api/posts/${id}`, data),                      // Atualizar um post
  deletePost: (id) => api.delete(`/api/posts/posts/${id}`),                         // Deletar um post
  likePost: (id) => api.post(`/api/posts/${id}/like`),                              // Curtir um post
  dislikePost: (id) => api.post(`/api/posts/${id}/dislike`),                        // Descurtir um post

  // Categorias
  getAllCategories: () => api.get("/api/categories"),                   // Obter todas as categorias
  createCategory: (data) => api.post("/api/categories", data),          // Criar nova categoria
  updateCategory: (id, data) => api.put(`/api/categories/${id}`, data), // Atualizar categoria
  deleteCategory: (id) => api.delete(`/api/categories/${id}`),          // Deletar categoria

  // Newsletter
  newsletterSubscribe: (data) => api.post("/api/newsletter/subscribe", data),         // Inscrever-se na newsletter
  unsubscribeNewsletter: (token) => api.get(`/api/newsletter/unsubscribe/${token}`),  // Cancelar inscrição na newsletter
};

export default apiServices;
