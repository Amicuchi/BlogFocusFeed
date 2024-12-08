import { useEffect, useState } from 'react';
import apiServices from '../../services/apiServices';
import FeaturedPost from './components/FeaturedPost/FeaturedPost';
import PostList from '../../components/PostList/PostList';
// import NewsLetter from './components/Newsletter/Newsletter';
import LoadingError from '../../components/LoadingError/LoadingError';
import styles from './Home.module.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca os posts ao carregar o componente
    useEffect(() => {
        const getPosts = async () => {
        try {
            setLoading(true);
            const response = await apiServices.getAllPosts();
            setPosts(response.data.posts || []); // Garantindo que seja um array
        } catch (error) {
            setError(error);
            console.error('Erro ao buscar os posts:', error);
        } finally {
            setLoading(false);
        }
    };
        getPosts();
    }, []);

    // Renderização condicional para estados de carregamento/erro
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar posts: {error.message || 'Erro desconhecido'}</div>;

    return (
        <main className={styles.mainHome}>
            <LoadingError isLoading={loading} error={error} />

            {!loading && !error && (
                <>
                    {posts.length > 0 && <FeaturedPost post={posts[0]} />}

                    <PostList posts={posts} limit={8} />

                    {/* <NewsLetter /> */}
                </>
            )}
        </main>
    )
}

export default Home;