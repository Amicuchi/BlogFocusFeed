import { useState } from "react";
import styles from "./ContactForm.module.css";
import apiServices from "../../services/apiServices";

function ContactForm() {
  // Estados para armazenar os dados do formulário e feedback do envio
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage("");

    try {
      const response = await apiServices.sendContactMessage(formData);

      if (response.status === 200) {
        setFeedbackMessage("Mensagem enviada com sucesso! Obrigado por entrar em contato.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFeedbackMessage("Erro ao enviar a mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setFeedbackMessage("Erro ao enviar a mensagem. Tente novamente.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.formTitle}>Entre em Contato</h2>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            id="message"
            name="message"
            placeholder="Sua mensagem"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.formButton} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {feedbackMessage && <p className={styles.feedback}>{feedbackMessage}</p>}
    </div>
  );
};

export default ContactForm;
