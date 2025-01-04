import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiServices from "../services/apiServices";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const userData = localStorage.getItem("user_data");

    const verifyToken = async () => {
      if (token && userData) {
        try {
          // Verifica se o token ainda é válido
          await apiServices.getUserProfile();
          setUser(JSON.parse(userData));
        } catch (error) {
          // Token inválido, faz logout
          console.error("Token inválido ou expirado:", error);
          logout();
        }
      }
    };

    verifyToken();
  }, []);

  const login = (token, user) => {
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setUser(null);
    window.location.href = "/";
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
