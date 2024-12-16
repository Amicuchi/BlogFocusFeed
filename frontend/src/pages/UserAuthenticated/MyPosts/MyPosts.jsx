import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import TablePosts from "./TablePosts";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./MyPosts.module.css";

function MyPosts() {
  const [posts, setPosts] = useState([]);       // Armazena os posts
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null);     // Controle de erros
  const navigate = useNavigate();
  const { user } = useAuth();
  const authorId = user.id;

  // Função para buscar os posts do usuário
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await apiServices.getPostsByAuthor(authorId);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Erro ao buscar posts", error);
      setError(error.response?.data?.message || 'Erro ao carregar os posts.');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um post
  const deletePost = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await apiServices.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert("Post excluído com sucesso!");
    } catch (error) {
      console.error("Erro detalhado ao excluir o post", {
        errorObject: error,
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status
      });
      alert("Erro ao excluir o post.");
    }
  };

  // Redireciona para a página de edição de post
  const editPost = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  useEffect(() => {
    fetchUserPosts(); // Busca os posts ao carregar o componente
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Meus Posts</h1>
      <TablePosts
        posts={posts}
        onEdit={editPost}
        onDelete={deletePost}
      />
    </section>
  );
}

export default MyPosts;