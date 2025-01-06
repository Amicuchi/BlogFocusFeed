import { Link } from 'react-router-dom';
import formatDate from '../../../../hooks/formatDate';
import PropTypes from 'prop-types';
import AuthorBadge from '../../../../components/AuthorBadge/AuthorBadge';
import styles from './FeaturedPost.module.css';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

function FeaturedPost({ post }) {
    const dataFormatada = formatDate(post?.updatedAt);

    if (!post) {
        return <div className={styles.error}>Nenhum post em destaque disponível.</div>;
    }

    const renderDescription = (description) => {
        const sanitizedDescription = DOMPurify.sanitize(description);
        return parse(sanitizedDescription); // Gera HTML seguro
    };

    return (
        <article className={styles.featuredPostContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={post.image || "/default-image.jpg"}
                    alt={post.title || "Post sem título"}
                    className={styles.featuredImage}
                />
            </div>

            <div className={styles.postContent}>
                <p className={styles.postDate}>Publicado em: {dataFormatada}</p>
                <Link to={`/post/${post._id}`} className={styles.postTitle}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                </Link>
                <div className={styles.postDescription}>
                    {renderDescription(post.description)}
                </div>
                <AuthorBadge post={post} />
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

FeaturedPost.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        updatedAt: PropTypes.string,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        authorName: PropTypes.string,
        authorRole: PropTypes.string,
        authorImg: PropTypes.string,
    }).isRequired,
};

export default FeaturedPost;