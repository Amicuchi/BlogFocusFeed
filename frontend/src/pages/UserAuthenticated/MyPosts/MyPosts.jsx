import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPosts() {
  const [posts, setPosts] = useState([]);       // Armazena os posts
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null);     // Controle de erros
  const navigate = useNavigate();

  // Função para buscar os posts do usuário
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/posts/user"); // Endpoint para buscar posts do usuário logado
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts", error);
      setError("Erro ao carregar os posts.");
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um post
  const deletePost = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Remove o post da lista
      alert("Post excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o post", error);
      alert("Erro ao excluir o post.");
    }
  };

  // Redireciona para a página de edição de post
  const editPost = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  useEffect(() => {
    fetchPosts(); // Busca os posts ao carregar o componente
  }, []);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section>
      <h1>Meus Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Visualizações</th>
            <th>Likes</th>
            <th>Deslikes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.views || 0}</td>
                <td>{post.likes || 0}</td>
                <td>{post.dislikes || 0}</td>
                <td>
                  <button onClick={() => editPost(post._id)}>Editar</button>
                  <button onClick={() => deletePost(post._id)}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum post encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default MyPosts;