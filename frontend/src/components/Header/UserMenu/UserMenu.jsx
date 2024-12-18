import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import apiServices from '../../../services/apiServices.js';
import avatar from '../../../assets/img/avatar.png';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);                            // Estado para o menu suspenso
  const [loading, setLoading] = useState(true);                           // Controle de carregamento
  const [error, setError] = useState(null);                               // Controle de erro
  const [userPictureProfile, setUserPictureProfile] = useState(avatar);   // Dados do perfil
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();                                     // Recupera os dados do usuário e função de logout

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

  // Carregar dados do perfil do usuário
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await apiServices.getUserProfile(user.id);
        const profilePicture = response.data?.data?.profilePicture || avatar;
        setUserPictureProfile(profilePicture);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setError(error.response?.data?.message || 'Erro ao carregar perfil.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user.id]);

  // Mostra carregando enquanto o estado do usuário é inicializado
  if (user === null) return <button className={styles.loginButton}>Carregando...</button>;

  // Renderizar botão de login se o usuário não estiver autenticado
  if (!user) {
    return (
      <button onClick={handleLogin} className={styles.loginButton}>
        Fazer Login
      </button>
    );
  }

  // Exibe mensagens de carregamento ou erro
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <nav ref={menuRef} className={styles.userMenu}>
      <button onClick={toggleMenu} className={styles.menuToggle}>
        <img
          src={userPictureProfile}
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