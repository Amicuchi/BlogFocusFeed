import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Estado para armazenar dados do usuário
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const userData = JSON.parse(localStorage.getItem('user_data')); // Recupera dados do usuário
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(userData);
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData)); // Armazena dados do usuário no localStorage
        setIsAuthenticated(true);
        setUser(userData);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data'); // Remove dados do usuário
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return { isAuthenticated, user, login, logout };
}