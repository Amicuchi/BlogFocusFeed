import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Categories from './Categories/Categories.jsx';
import UserMenu from './UserMenu/UserMenu.jsx'; // Importando o componente UserMenu

function Header() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login
    // const { isAuthenticated, user } = useAuth(); // Hook hipotético de autenticação
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica se existe token
    const navigate = useNavigate();

    // Função que será chamada ao clicar no botão Login
    const handleLoginClick = () => {
        navigate('/login');
    };

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
                    {isLoggedIn ? (
                        <UserMenu username="Nome do Usuário" />
                    ) : (
                        <button
                            className={styles.loginButton}
                            onClick={handleLoginClick}
                        >
                            Login
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