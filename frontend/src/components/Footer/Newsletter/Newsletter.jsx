import { useState } from "react";
import apiServices from "../../../services/apiServices";
import styles from "./Newsletter.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");     // Armazena o e-mail digitado
  const [message, setMessage] = useState(""); // Armazena mensagens de sucesso ou erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await apiServices.newsletterSubscribe({ email });

      // Verifica se o backend respondeu com sucesso
      if (response?.data?.success) {
        setMessage(
          response.data.fullName
            ? `Obrigado, ${response.data.fullName}, por se inscrever!`
            : response.data.message
        );
        setEmail(""); // Limpa o campo de e-mail no caso de sucesso
      } 
      else {
        // Trata caso o backend sinalize erro
        setMessage(response?.data?.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
    // Trata erro de comunicação com a API
      console.error("Erro no envio:", error.message);
      setMessage(error.response?.data?.message || "Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <section className={styles.newsletter}>
      <h2>Cadastre-se para receber nossas novidades!</h2>
      <p>Receba as últimas notícias e atualizações diretamente na sua caixa de entrada.</p>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu melhor e-mail"
            required
          />
        </label>
        <button
          type="submit"
        >
          Inscreva-me
        </button>
      </form>

      {/* Mensagem de feedback */}
      {message && <p>{message}</p>}
    </section>
  );
}

export default Newsletter;
