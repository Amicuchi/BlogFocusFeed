import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Newsletter from './Newsletter/Newsletter';
import Menu from './Menu/Menu';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>

      <div className={styles.footerTop}>
        <div className={styles.footerLeft}>
          <Link to="/" className={styles.footerLogo}>FocusFeed</Link>
          <p className={styles.footerP}>DevsFactoryBrazil@gmail.com</p>
        </div>
        <div className={styles.footerCenter}>
          <Menu />
        </div>
        <div className={styles.footerRight}>
          <Newsletter />
        </div>
      </div>
    <hr />
      <div className={styles.footerBottom}>
        <div className={styles.footerLeft}>
          <Link to="/terms" className={styles.footerP}>Termos de Uso</Link>
          <Link to="/privacy" className={styles.footerP}>Política de Privacidade</Link>
        </div>
        <div className={styles.footerRight}>
          <p className={styles.footerP}>FocusFeed | &copy;{currentYear} Todos os direitos reservados</p>
          <p className={styles.footerP}>Desenvolvido por Anderson Amicuchi</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;