import { Link } from 'react-router-dom'
import formatDate from '../../hooks/formatDate.js';
import PropTypes from 'prop-types';
import styles from './PostCard.module.css';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

function PostCard({ post }) {
    const dataFormatada = formatDate(post?.postDate);
    const renderDescription = (description) => {
        const sanitizedDescription = DOMPurify.sanitize(description);
        return parse(sanitizedDescription);
    };

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
                <div className={styles.postDescription}>
                    {renderDescription(post.description)}
                </div>
                <div className={styles.tags}>
                    {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
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