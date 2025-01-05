import { useState, useEffect } from "react";
import apiServices from "../../../services/apiServices";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'users') {
          const response = await apiServices.getAllUsers();
          setUsers(response.data);
        } else {
          const response = await apiServices.getAllPosts();
          setPosts(response.data);
        }
      } catch (error) {
        setError(`Erro ao carregar ${activeTab === 'users' ? 'usuários' : 'posts'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleRoleChange = async (userId, currentRole) => {
    const roles = ['READER', 'AUTHOR', 'MODERATOR'];
    const currentIndex = roles.indexOf(currentRole);
    const newRole = roles[(currentIndex + 1) % roles.length];

    try {
      await apiServices.changeUserRole(userId, newRole);
      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, role: newRole } : u)
      );
      toast.success('Cargo  alterado com sucesso!');
    } catch (error) {
      toast.error("Erro ao  alterar cargo. ", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await apiServices.ownerDeleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error("Erro ao excluir usuário. ", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await apiServices.deletePost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
      toast.success('Post excluído com sucesso!');
    } catch (error) {
      toast.error("Erro ao excluir post. ", error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Painel de Controle</h1>
      
      <div className={styles.tabs}>
        <button 
          className={activeTab === 'users' ? styles.activeTab : ''} 
          onClick={() => setActiveTab('users')}
        >
          Usuários
        </button>
        <button 
          className={activeTab === 'posts' ? styles.activeTab : ''} 
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {!loading && !error && activeTab === 'users' && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== 'owner' && (
                    <>
                      <button 
                      onClick={() => handleRoleChange(u.id, u.role)}
                      >
                        Alterar Cargo
                      </button>
                      <button onClick={() => handleDeleteUser(u.id)}>
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && activeTab === 'posts' && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author.username}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;