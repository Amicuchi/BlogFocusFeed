// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import MainContent from '../components/MainContent';
import { postService } from '../services/postService';

function Home() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPost = async () => {
      try {
        const posts = await postService.getPosts({ featured: true, limit: 1 });
        if (posts && posts.length > 0) {
          setFeatured(posts[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar post em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPost();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Post em Destaque */}
      {featured && !loading && (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">{featured.title}</h1>
                <p className="text-lg mb-6">{featured.excerpt}</p>
                <button 
                  onClick={() => window.location.href = `/post/${featured.id}`}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Ler artigo completo
                </button>
              </div>
              <div className="hidden md:block">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lista Principal de Posts */}
      <MainContent />
    </div>
  );
}

export default Home;