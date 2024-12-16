import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import TablePosts from "./TablePosts";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import styles from "./MyPosts.module.css";
import "react-toastify/dist/ReactToastify.css";

function MyPosts() {
  const [posts, setPosts] = useState([]); // Armazena os posts
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Controle de erros
  const navigate = useNavigate();
  const { user } = useAuth();
  const authorId = user.id;

  // Função para buscar os posts do usuário
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await apiServices.getPostsByAuthor(authorId);
      setPosts(response.data.posts);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar posts", error);
      setError(error.response?.data?.message || "Erro ao carregar os posts.");
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um post
  const deletePost = async (postId) => {
    try {
      console.log(`Tentando deletar post: ${postId}`);
      const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir este post?"
      );

      if (!confirmDelete) return;

      const response = await apiServices.deletePost(postId);
      console.log("Resposta da API:", response);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post excluído com sucesso!");
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
    fetchUserPosts();
  }, [authorId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Meus Posts</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <TablePosts posts={posts} onEdit={editPost} onDelete={deletePost} />
    </section>
  );
}

export default MyPosts;
