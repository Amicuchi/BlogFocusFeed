import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avatar from '../../assets/img/avatar.png';
import styles from './AuthorBadge.module.css';
import apiServices from '../../services/apiServices';

function AuthorBadge({ post }) {

    const [authorPictureProfile, setAuthorPictureProfile] = useState(null); // Dados do perfil
    const [loading, setLoading] = useState(true);                           // Controle de carregamento
    const [error, setError] = useState(null);                               // Controle de erro

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await apiServices.getAuthorProfile(post.author._id);
                const profilePicture = response.data.data?.profilePicture || avatar;
                setAuthorPictureProfile(profilePicture);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                setError(error.response?.data?.message || 'Erro ao carregar perfil.');
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [post]);

    if (loading) return <div className={styles.loading}>Carregando perfil...</div>;
    if (error) return <div className={styles.error}>Erro ao carregar perfil: {error}</div>;

    return (
        <div className={styles.authorBadgeContainer}>
            <img
                src={authorPictureProfile || avatar}
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
            _id: PropTypes.string.isRequired,
            profilePicture: PropTypes.string,
            fullName: PropTypes.string,
            authorRole: PropTypes.string,
        }),
    }),
};

export default AuthorBadge;