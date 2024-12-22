import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiServices from "../../services/apiServices";
import styles from "../../pages/UserAuthenticated/Settings/Settings.module.css";

function ResetPassword () {
  const { user } = useAuth();
  const token = localStorage.getItem("jwt_token");

  // Estados para armazenar as senhas e mensagens
  const [currentPassword, setCurrentPassword] = useState("");   // Senha atual
  const [newPassword, setNewPassword] = useState("");           // Nova senha
  const [confirmPassword, setConfirmPassword] = useState("");   // Confirmação da nova senha
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      setErrorMessage("Você precisa estar autenticado para redefinir a senha.");
      return;
    }

    // Verificando se as senhas coincidem
    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    // Validação da nova senha
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número."
      );
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Chamada para o serviço de API para redefinir a senha
      await apiServices.resetPassword(token, currentPassword, newPassword);
      setSuccessMessage(
        "Senha redefinida com sucesso! Você já pode fazer login."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Senha atual"
          required
          className={styles.input}
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova senha"
          required
          className={styles.input}
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua nova senha"
          required
          className={styles.input}
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? "Redefinindo..." : "Redefinir"}
        </button>
        
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
