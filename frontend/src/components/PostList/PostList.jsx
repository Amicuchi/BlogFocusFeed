import { useState } from 'react';
import PostCard from '../PostCard/PostCard.jsx';
import PropTypes from 'prop-types';
import styles from './PostList.module.css';

function PostList({ posts, initialLimit = 6 }) {
    const [limit, setLimit] = useState(initialLimit);

    const validatePosts = () => {
        if (!posts) return <div>Carregando posts...</div>
        
        if (!Array.isArray(posts)) {
            console.error('posts deve ser um array', posts);
            return <div>Nenhum post disponível</div>
        }
        if (posts.length === 0) return <div>Nenhum post encontrado.</div>;
        return null;
    };

    const validationResult = validatePosts();
    if (validationResult) return validationResult;

    const limitedPosts = posts.slice(0, limit);

    return (
        <section className={styles.PostListContainer}>
            {limitedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {posts.length > limit && (
                <button
                    className={styles.loadMoreButton}
                    onClick={() => setLimit((prev) => prev + 6)}
                >
                    Carregar mais
                </button>
            )}
        </section>
    )
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    initialLimit: PropTypes.number,
    limit: PropTypes.number,
};

export default PostList;