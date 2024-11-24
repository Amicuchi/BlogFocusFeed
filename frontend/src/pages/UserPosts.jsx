import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/postService';
import ArticleCard from '../components/ArticleCard';


function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getPosts({ author: true });
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await postService.deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Posts</h1>
        <Link
          to="/novo-post"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Novo Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Você ainda não criou nenhum post.</p>
          <Link
            to="/novo-post"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Criar meu primeiro post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <ArticleCard article={post} />
              <div className="absolute top-2 right-2 space-x-2">
                <Link
                  to={`/editar-post/${post.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPosts;