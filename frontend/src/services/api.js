import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

// Função auxiliar para processar a fila de requisições pendentes durante o refresh do token
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptor para adicionar o token às requisições e renovar se necessário
api.interceptors.request.use(
  async (config) => {
    
    function decodeJWT(token) {
      try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    
    const token = localStorage.getItem('jwt_token');

    if (token) {
      try {
        const decoded = decodeJWT(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
                token,
              });

              const newToken = response.data.token;
              localStorage.setItem('jwt_token', newToken);
              processQueue(null, newToken);
              config.headers['Authorization'] = `Bearer ${newToken}`;
            } catch (error) {
              processQueue(error, null);
              localStorage.removeItem('jwt_token');
              window.location.href = '/login';
            } finally {
              isRefreshing = false;
            }
          }

          // Adiciona a requisição atual à fila enquanto o token é renovado
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
        }

        // Adiciona o token às requisições
        config.headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
        localStorage.removeItem('jwt_token');
        window.location.href = '/login';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros de resposta globalmente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          token: localStorage.getItem('jwt_token'),
        });

        const newToken = response.data.token;
        localStorage.setItem('jwt_token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('jwt_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;