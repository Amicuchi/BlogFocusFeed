import PropTypes from 'prop-types';
import styles from './AuthorBadge.module.css';

function AuthorBadge({ post }) {
    if (!post) return null;
    
    return (
        <div className={styles.authorBadgeContainer}>
            <img 
            src={post.author.profilePicture} 
            alt={post.author.fullName} 
            className={styles.authorBadgeContainerImg} />
            <div className={styles.authorBadgeContainerId}>
                <h3 className={styles.authorBadgeContainerH3}>{post.author.fullName || "Autor Desconhecido"}</h3>
                <p className={styles.authorBadgeContainerP}>{post.author.authorRole || "Autor"}</p>
            </div>
        </div>
    )
}

AuthorBadge.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.shape({
            profilePicture: PropTypes.string,
            fullName: PropTypes.string,
            authorRole: PropTypes.string,
        }),
    }),
};

export default AuthorBadge;