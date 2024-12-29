import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Categories from './Categories/Categories.jsx';
import UserMenu from './UserMenu/UserMenu.jsx';
import styles from './Header.module.css';
import SearchBar from './SearchBar/SearchBar.jsx';

function Header() {
    const { signed, user, logout } = useAuth(); // Usa o contexto global de autenticação

    return (
        <header className={styles.gradientBorder}>
            {/* Primeira linha do header: Logo e container de busca/login */}
            <div className={styles.topBar}>
                <h1 className={styles.logo}>
                    <Link to="/" className={styles.logoLink}>FocusFeed</Link>
                </h1>
                <div className={styles.searchLoginContainer}>
                    <SearchBar />
                    
                    {signed ? (
                        <UserMenu
                            username={user?.username || 'Usuário sem username'}
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