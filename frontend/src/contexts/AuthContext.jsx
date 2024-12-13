import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('user_token');
        const userData = localStorage.getItem('user_data');

        if (userToken && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);