import styles from './Newsletter.module.css';

function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div>
        <h2>Inscreva-se na Newsletter</h2>
        <p>Receba as últimas notícias e atualizações diretamente na sua caixa de entrada.</p>
        <form>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            required
          />
          <button
            type="submit"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
