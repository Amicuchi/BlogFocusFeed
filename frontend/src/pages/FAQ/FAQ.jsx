import { useEffect, useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    fetch('/data/faq.json')
      .then((response) => response.json())
      .then((data) => setFaqData(data))
      .catch((error) => console.error('Erro ao carregar FAQ:', error));
  }, []);

  return (
    <main className={styles.container}>
      <h1>FAQ - Perguntas Frequentes</h1>
      {faqData.map((item, index) => (
        <article key={index} className={styles.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </article>
      ))}
    </main>
  );
};

export default FAQ;