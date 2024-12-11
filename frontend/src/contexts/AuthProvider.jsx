import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Carrega o estado inicial a partir do localStorage
    useEffect(() => {
        // Verifica o token ao carregar o aplicativo
        const token = localStorage.getItem('jwt_token');
        const userData = JSON.parse(localStorage.getItem('user_data'));

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(userData);
        }
    }, []);
    

    // Função de login
    const login = (token, userData) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Função de logout
    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
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

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => {
    return useContext(AuthContext);
};
