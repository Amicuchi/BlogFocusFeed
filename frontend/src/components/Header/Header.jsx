import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Categories from './Categories/Categories.jsx';
import UserMenu from './UserMenu/UserMenu.jsx';
import styles from './Header.module.css';

function Header() {
    const { isAuthenticated, user, logout } = useAuth(); // Usa o contexto global de autenticação

    return (
        <header className={styles.gradientBorder}>
            {/* Primeira linha do header: Logo e container de busca/login */}
            <div className={styles.topBar}>
                <h1 className={styles.logo}>
                    <Link to="/" className={styles.logoLink}>FocusFeed</Link>
                </h1>
                <div className={styles.searchLoginContainer}>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Pesquisar"
                            aria-label="Campo de busca"
                        />
                        <button
                            className={styles.searchInputBtn}
                            type="button"
                        >
                            🔍
                        </button>
                    </div>
                    {isAuthenticated ? (
                        <UserMenu
                            username={user?.username || 'Usuário'}
                            onLogout={logout}
                        />
                    ) : (
                        <button className={styles.loginButton} >
                            <Link to="/login">Login</Link>
                        </button>
                    )}
                </div>
            </div>

            {/* Segunda linha */}
            <Categories />
        </header>
    )
}

export default Header;