import PostCard from "../PostCard/PostCard.jsx";
import PropTypes from "prop-types";
import styles from "./PostList.module.css";

function PostList({ posts, onLoadMore, hasMore, isLoading, error }) {
    if (error) return <div className={styles.error}>{error}</div>;
    if (isLoading && !posts.length) return <div>Carregando posts...</div>;

    return (
        <section className={styles.PostListContainer}>
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {isLoading && <div>Carregando mais posts...</div>}

            {hasMore && !isLoading && posts.length > 0 && (
                <button
                    className={styles.loadMoreButton}
                    onClick={onLoadMore}
                    disabled={isLoading}
                    aria-label="Carregar mais posts"
                >
                    Carregar mais
                </button>
            )}
            {!(hasMore && !isLoading && posts.length > 0) && (
                <div className={styles.noMorePosts}>
                    Não há mais posts para carregar
                </div>
            )}
        </section>
    );
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
        })
    ).isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default PostList;