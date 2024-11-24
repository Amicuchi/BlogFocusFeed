import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async (authToken) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Falha ao buscar dados do usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        logout();
      }
    };

    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, [logout]);

  const login = async (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('authToken', userToken);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;


// Validação de props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};