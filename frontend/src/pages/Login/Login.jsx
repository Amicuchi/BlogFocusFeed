import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import apiServices from "../../services/apiServices";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");             // Estado para armazenar o username inserido pelo usuário
  const [password, setPassword] = useState("");       // Estado para armazenar a senha inserida
  const [error, setError] = useState("");             // Estado para exibir mensagens de erro (ex.: login inválido)
  const [isLoading, setIsLoading] = useState(false);  // Estado para controlar o estado de carregamento do botão de login
  const navigate = useNavigate();                     // Hook do React Router para redirecionamento de páginas
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validações básicas
    if (!email.trim() || !password.trim()) {
      setError("E-mail e senha são obrigatórios");
      setIsLoading(false);
      return;
    }

    try {
      // Faz login e armazena token e dados do usuário
      const response = await apiServices.loginUser({
        email: email.trim(),
        password,
      });

      // Armazena o token JWT retornado no localStorage para autenticação futura
      const { token, user } = response.data.data; // Backend retorna esses dados

      login(token, user);                         // Passa o token e os dados do usuário para o hook de autenticação
      navigate("/");                              // Redireciona após login bem-sucedido

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Erro ao realizar login. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Digite seu email"
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Digite sua senha"
        />

        <button 
          type="submit" 
          disabled={isLoading}
          >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
      <p>
        Esqueceu a senha? <a href="/forgot-password">Clique aqui!</a>
      </p>
    </section>
  );
}

export default Login;