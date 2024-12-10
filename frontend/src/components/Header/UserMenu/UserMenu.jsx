import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';
import { useAuth } from '../../../contexts/AuthProvider.jsx';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);  // Estado para o menu suspenso
  const { user, logout } = useAuth();           // Recupera os dados do usuário e função de logout
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Alternar a abertura/fechamento do menu suspenso
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Redirecionar para a página de login se o usuário não estiver autenticado
  const handleLogin = () => {
    navigate('/login');
  };

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Renderizar botão de login se o usuário não estiver autenticado
  if (!user) {
    return (
      <button onClick={handleLogin} className={styles.loginButton}>
        Fazer Login
      </button>
    );
  }

  // Renderizar menu suspenso para o usuário autenticado
  return (
    <div ref={menuRef} className={styles.userMenu}>
      <button onClick={toggleMenu} className={styles.menuToggle}>
        {user.username}
      </button>
      {isOpen && (
        <ul className={styles.menuDropdown}>
          <li>
            <Link to="/dashboard/perfil" className={styles.menuItem}>Exibir Perfil</Link>
          </li>
          <li>
            <Link to="/dashboard/configuracoes" className={styles.menuItem}>Configurações</Link>
          </li>
          <li>
            <Link to="/dashboard/meus-posts" className={styles.menuItem}>Meus Posts</Link>
          </li>
          <li>
            <Link to="/dashboard/novo-post" className={styles.menuItem}>Novo Post</Link>
          </li>
          <li>
            <button onClick={logout} className={styles.logoutButton}>
              Sair
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;