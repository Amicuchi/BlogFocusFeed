import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../ArticleCard';

function CategoryPosts() {
  const { category } = useParams(); // Obtém o nome da categoria a partir da URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/posts?category=${category}`);
        if (!response.ok) throw new Error('Erro ao carregar os posts da categoria');
        const data = await response.json();

        // Garante que posts seja um array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]); // Define como vazio se não for um array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [category]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  // Mensagem amigável para categorias sem posts
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center">
        Nenhum post encontrado para a categoria <strong>{category}</strong>.
      </p>
    );
  }

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <ArticleCard key={post.id} article={post} />
      ))}
    </section>
  );
}

export default CategoryPosts;