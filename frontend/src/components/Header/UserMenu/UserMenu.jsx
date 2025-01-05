import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import apiServices from "../../../services/apiServices.js";
import avatar from "../../../assets/img/avatar.png";
import styles from "./UserMenu.module.css";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false); // Estado para o menu suspenso
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Controle de erro
  const [userPictureProfile, setUserPictureProfile] = useState(avatar); // Dados do perfil
  const [role, setRole] = useState(""); // Estado para o papel do usuário
  const menuRef = useRef(null); // Referência para o menu suspenso
  const navigate = useNavigate(); // Navegação programática
  const { user, logout } = useAuth(); // Recupera os dados do usuário e função de logout

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Obtém o papel (role) do usuário
  useEffect(() => {
    const fetchRole = async () => {
      if (user?.id) {
        try {
          const userRole = await apiServices.getUserRole();
          setRole(userRole.data.role);
        } catch (error) {
          console.error("Erro ao buscar o papel do usuário:", error);
          setError("Erro ao buscar papel do usuário."); // Adiciona mensagem de erro
        }
      }
    };

    fetchRole();
  }, [user?.id]);

  // Obtém os dados do perfil do usuário
  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiServices.getUserProfile(user.id);
        const profilePicture = response.data?.data?.profilePicture || avatar;

        // Verifica se a imagem é válida usando Promisses
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve; // Resolução bem-sucedida
          img.onerror = reject; // Rejeição em caso de erro
          img.src = profilePicture; // Define a URL da imagem
        });

        setUserPictureProfile(profilePicture);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError(error.response?.data?.message || "Erro ao carregar perfil.");
        setUserPictureProfile(avatar); // Fallback para o avatar
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user?.id]);

  // Mostra "Carregando" enquanto o estado do usuário é inicializado
  if (loading) {
    return <button className={styles.loginButton}>Carregando...</button>;
  }

  // Renderiza o botão de login se o usuário não estiver autenticado
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
          <li>
            <Link to="/dashboard/perfil" className={styles.menuItem}>
              Exibir Perfil
            </Link>
          </li>
          <li>
            <Link to="/dashboard/configuracoes" className={styles.menuItem}>
              Configurações
            </Link>
          </li>

          {["AUTHOR", "MODERATOR", "OWNER"].includes(role) ? (
            <li>
              <Link to="/dashboard/meus-posts" className={styles.menuItem}>
                Meus Posts
              </Link>
            </li>
          ) : null}

          {["AUTHOR", "MODERATOR", "OWNER"].includes(role) ? (
            <li>
              <Link to="/dashboard/novo-post" className={styles.menuItem}>
                Novo Post
              </Link>
            </li>
          ) : null}

          {["MODERATOR", "OWNER"].includes(role) ? (
            <li>
            <Link to="/dashboard" className={styles.menuItem}>
              Dashboard
            </Link>
          </li>
          ) : null}

          <li>
            <button onClick={logout} className={styles.logoutButton}>
              Sair
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default UserMenu;
