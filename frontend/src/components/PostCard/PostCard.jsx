import { Link } from 'react-router-dom'
import { useFormatarData } from '../../hooks/useFormatarData';
import PropTypes from 'prop-types';
import styles from './PostCard.module.css';

function PostCard({ post }) {
    const dataFormatada = useFormatarData(post?.postDate);

    return (
        <article className={styles.PostContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={post.image || '/default-image.jpg'}
                    alt={post.title}
                    className={styles.postImage}
                />
            </div>

            <div className={styles.postContent}>
                <p className={styles.postDate}>{dataFormatada}</p>
                <Link to={`/post/${post._id}`} className={styles.postTitle}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                </Link>
                <p className={styles.postDescription}>{post.description}</p>
                <p className={styles.postTags}>{post.tags}</p>
            </div>
        </article>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        postDate: PropTypes.string,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default PostCard;