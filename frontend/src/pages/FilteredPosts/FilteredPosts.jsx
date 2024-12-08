import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiServices from '../../services/apiServices.js';
import PostList from '../../components/PostList/PostList';
import styles from './FilteredPosts.module.css';
// import axios from 'axios';

function FilteredPosts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { category } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getFilteredPosts() {
            try {
                setLoading(true);
                const response = await apiServices.searchPosts(category, currentPage);
                // const response = await apiServices.filterPostsByCategory(category);
                // const response = await axios.get(`http://localhost:5000/api/posts?category=${category}`);
                setPosts(response.data.posts);
                setTotalPages(response.data.totalPages);
                setError(null);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getFilteredPosts();
    }, [category, currentPage]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar posts: {error}</div>;

    return (
        <div className={styles.filteredPostsContainer}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <section className={styles.filteredPostsContent}>
                <PostList posts={posts} />
            </section>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilteredPosts;