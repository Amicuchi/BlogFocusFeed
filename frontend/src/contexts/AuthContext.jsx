import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

// Componente de contexto para autenticação
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Carrega o estado inicial ao montar o componentea partir do localStorage
    useEffect(() => {
        // Verifica se o token existe no localStorage ao montar o componente
        const token = localStorage.getItem('jwt_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erro ao parsear user_data:', error);
                localStorage.removeItem('user_data'); // Remove dado inválido
            }
        }
    }, []);

    // Função para realizar login
    const login = (token, userData) => {
        localStorage.setItem('jwt_token', token); // Armazena o token
        localStorage.setItem('user_data', JSON.stringify(userData));
        setIsAuthenticated(true);             // Atualiza o estado para autenticado
        setUser(userData);
    };

    // Função para realizar o logout e remover o token do localStorage
    const logout = () => {
        localStorage.removeItem('jwt_token');   // Remove o token
        localStorage.removeItem('user_data');   // Remove os dados do usuário do localStorage
        setIsAuthenticated(false);              // Atualiza o estado para não autenticado
        setUser(null);                          // Remove os dados do usuário do estado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);