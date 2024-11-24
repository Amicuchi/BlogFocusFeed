import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { postService } from '../services/postService';

const MainContent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getPosts();

      // Garante que o retorno é um array
      if (Array.isArray(data)) {
        setArticles(data);
      } else {
        console.error('Resposta inesperada da API:', data);
        setArticles([]); // Define como vazio caso a API não retorne um array
      }
    } catch (err) {
      console.error('Erro ao carregar os artigos:', err);
      setError('Falha ao carregar os artigos.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </main>
    );
  }

  if (articles.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-700">
          Nenhum post encontrado. Por favor, adicione novos artigos!
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
