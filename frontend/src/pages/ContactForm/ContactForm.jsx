import styles from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.formTitle}>Entre em Contato</h2>

      <form className={styles.contactForm}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu e-mail"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            id="message"
            name="message"
            placeholder="Sua mensagem"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.formButton}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
