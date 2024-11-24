import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams(); // Obtém o ID do post a partir da URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar o post');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      <img src={post.image} alt={post.title} className="w-full h-auto rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="text-gray-800">{post.content}</div>
      <div className="mt-4">
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
    </article>
  );
}

export default PostDetail;