import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiServices from "../../services/apiServices";
import styles from "./TableFilteredPosts.module.css";

function TableFilteredPosts() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Indica carregamento
  const [error, setError] = useState(null); // Armazena erros

  // Realiza a busca ao carregar o componente
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiServices.searchPosts(query);
        setPosts(response.data.data);
      } catch (error) {
        setError("Erro ao buscar posts");
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchPosts();
  }, [query]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <h2>Resultados para: {query}</h2>
      {posts.length > 0 ? (
        <table className={styles.postTable}>
          <thead>
            <tr>
              <th>Post</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td className={styles.postRow}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.postInfo}>
                    <h3>
                      <Link to={`/post/${post._id}`} className={styles.postTitle}>{post.title}</Link>
                    </h3>
                    <p>
                      <span>{post.views} views</span> |
                      <span>{post.likes} likes</span> |
                      <span>{post.dislikes} dislikes</span>
                    </p>
                    <p>{post.content.substring(0, 100)}...</p>
                    <p className={styles.tags}>{post.tags.join(", ")}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export default TableFilteredPosts;
