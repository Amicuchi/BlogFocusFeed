import { useCallback, useEffect, useState } from 'react';
import apiServices from '../../services/apiServices';
import FeaturedPost from './components/FeaturedPost/FeaturedPost';
import PostList from '../../components/PostList/PostList';
import styles from './Home.module.css';

function Home() {

    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadPosts = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await apiServices.getAllPosts({
                page,
                limit: page === 1 ? 11 : 10, // Na primeira página, pegamos 11 posts
            });

            const allPosts = response.data.data;
            const { totalPages } = response.data.pagination;

            if (page === 1 && allPosts.length > 0) {
                setFeaturedPost(allPosts[0]);       // Primeiro post é o destaque
                setPosts(allPosts.slice(1));        // Remove o primeiro post (já foi para o FeaturedPost)
            } else if (allPosts) {
                setPosts(prev => {
                    // Adiciona somente posts novos (evita duplicatas)
                    const idsExistentes = new Set(prev.map(post => post._id));
                    const novosPosts = allPosts.filter(post => !idsExistentes.has(post._id));
                    return [...prev, ...novosPosts];
                });
            }
    
            setHasMore(page < totalPages); // Verifica se ainda há mais páginas
        } catch (error) {
            setError(`Erro ao carregar posts (${error.message})`);
            console.error('Error loading posts:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const handleLoadMore = () => setPage(prev => prev + 1);

    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <main className={styles.mainHome}>
            {featuredPost && <FeaturedPost post={featuredPost} />}
            <PostList
                posts={posts}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isLoading={isLoading}
                error={error}
            />
        </main>
    );
};

export default Home;