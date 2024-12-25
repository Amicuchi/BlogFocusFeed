import { useState } from 'react';
import apiServices from '../../services/apiServices';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await apiServices.forgotPassword(email);
      setSuccessMessage('E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro ao solicitar recuperação de senha.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
