import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import avatar from '../../../assets/img/avatar.png';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);  // Estado para o menu suspenso
  const { user, logout } = useAuth();           // Recupera os dados do usuário e função de logout
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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

  // Mostra carregando enquanto o estado do usuário é inicializado
  if (user === null) {
    return <button className={styles.loginButton}>Carregando...</button>;
  }

  // Renderizar botão de login se o usuário não estiver autenticado
  if (!user) {
    return (
      <button onClick={handleLogin} className={styles.loginButton}>
        Fazer Login
      </button>
    );
  }

  return (
    <nav ref={menuRef} className={styles.userMenu}>
      <button onClick={toggleMenu} className={styles.menuToggle}>
        <img
          src={user.profilePicture || avatar}
          alt={`Foto de ${user.username}`}
          className={styles.userAvatar}
          />
          {user.username}
      </button>
      {isOpen && (
        <ul className={styles.menuDropdown}>
          <li><Link to="/dashboard/perfil" className={styles.menuItem}>Exibir Perfil</Link></li>
          <li><Link to="/dashboard/configuracoes" className={styles.menuItem}>Configurações</Link></li>
          <li><Link to="/dashboard/meus-posts" className={styles.menuItem}>Meus Posts</Link></li>
          <li><Link to="/dashboard/novo-post" className={styles.menuItem}>Novo Post</Link></li>
          <li><button onClick={logout} className={styles.logoutButton}>Sair</button></li>
        </ul>
      )}
    </nav>
  );
};

export default UserMenu;