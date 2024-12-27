import { useEffect, useState } from "react";
import apiServices from "../../services/apiServices";
import PropTypes from "prop-types";
import avatar from "../../assets/img/avatar.png";
import styles from "./AuthorBadge.module.css";

function AuthorBadge({ post }) {
    const [authorPictureProfile, setAuthorPictureProfile] = useState(avatar);
    const [loading, setLoading] = useState(true);                           // Controle de carregamento
    const [error, setError] = useState(null);                               // Controle de erro

    useEffect(() => {
        async function fetchProfile() {
            // Verifica se o autor está definido no post
            if (!post.author) {
                setLoading(false); // Define como carregado
                return;            // Encerra a execução do fetch
            }

            try {
                const response = await apiServices.getAuthorProfile(post.author._id);

                // Define a imagem do autor ou mantém o avatar padrão
                const profilePicture = response.data.data?.profilePicture || avatar;
                setAuthorPictureProfile(profilePicture);
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
                setError(error.response?.data?.message || 'Erro ao carregar perfil.');
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [post]);

    if (loading) return <div className={styles.loading}>Carregando perfil...</div>;
    if (error) return <div className={styles.error}>Erro ao carregar perfil: {error}</div>;

    // Dados do autor ou valores padrão
    const authorFullName = post.author?.fullName || "Usuário Removido";
    const authorRole = post.author?.authorRole || "Autor";

    return (
        <div className={styles.authorBadgeContainer}>
            <img
                src={authorPictureProfile}
                alt={authorFullName}
                className={styles.authorBadgeContainerImg}
            />
            <div className={styles.authorBadgeContainerId}>
                <h3 className={styles.authorBadgeContainerH3}>{authorFullName}</h3>
                <p className={styles.authorBadgeContainerP}>{authorRole}</p>
            </div>
        </div>
    );
};

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