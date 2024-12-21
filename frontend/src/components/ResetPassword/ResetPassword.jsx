import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiServices from '../../services/apiServices';
import styles from '../../pages/UserAuthenticated/Settings/Settings.module.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await apiServices.resetPassword(token, newPassword);
      setSuccessMessage('Senha redefinida com sucesso! Você já pode fazer login.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro ao redefinir senha.');
      console.error(error);
      console.error(error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* <h2>Redefinir Senha</h2> */}
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
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Redefinindo...' : 'Redefinir'}
        </button>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
