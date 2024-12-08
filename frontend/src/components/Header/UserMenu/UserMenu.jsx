import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';
import { useAuth } from '../../../hooks/useAuth';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Recupera os dados do usuário e função de logout
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

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

  if (!user) {
    return (
      <button onClick={handleLogin} className={styles.loginButton}>
        Fazer Login
      </button>
    );
  }

  return (
    <div ref={menuRef} className={styles.userMenu}>
      <button onClick={toggleMenu} className={styles.menuToggle}>
        {user.username}
      </button>
      {isOpen && (
        <ul className={styles.menuDropdown}>
          <li>
            <Link to="/profile" className={styles.menuItem}>Exibir Perfil</Link>
          </li>
          <li>
            <Link to="/settings" className={styles.menuItem}>Configurações</Link>
          </li>
          <li>
            <Link to="/my-posts" className={styles.menuItem}>Meus Posts</Link>
          </li>
          <li>
            <Link to="/new-post" className={styles.menuItem}>Novo Post</Link>
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