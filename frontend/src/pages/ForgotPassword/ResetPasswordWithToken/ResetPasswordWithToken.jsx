import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import styles from "../ForgotPassword.module.css";

function ResetPasswordWithToken() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Chamando o serviço para resetar a senha
      await apiServices.resetPasswordWithToken(token, newPassword);
      setSuccessMessage("Senha redefinida com sucesso! Você já pode fazer login.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erro ao redefinir a senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          className={styles.submitBtn}
        >
          {isSubmitting ? "Redefinindo..." : "Redefinir"}
        </button>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ResetPasswordWithToken;