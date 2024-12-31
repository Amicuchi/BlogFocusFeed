import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormatarData } from '../../hooks/useFormatarData.js';
import apiServices from '../../services/apiServices.js';
import AuthorBadge from '../../components/AuthorBadge/AuthorBadge';
import styles from './OpenedPost.module.css';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useAuth } from '../../contexts/AuthContext.jsx';

function OpenedPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { signed: isAuthenticated } = useAuth();

    const dataFormatada = useFormatarData(post?.createdAt);

    const handleLike = async () => {
        if (!isAuthenticated) {
            alert('Faça login para interagir com o post');
            return;
        }
        try {
            const response = await apiServices.likePost(id);
            setPost(response.data.data);
        } catch (error) {
            console.error('Erro ao dar like:', error);
        }
    };

    const handleDislike = async () => {
        if (!isAuthenticated) {
            alert('Faça login para interagir com o post');
            return;
        }
        try {
            const response = await apiServices.dislikePost(id);
            setPost(response.data.data);
        } catch (error) {
            console.error('Erro ao dar dislike:', error);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await apiServices.getPostById(id);
                setPost(response.data.data);
                setError(null);
            } catch (error) {
                console.error("Erro ao carregar o post:", error);
                setError("Erro ao carregar o post. Tente novamente.", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    const renderContent = (content) => {
        const sanitizedContent = DOMPurify.sanitize(content);
        return parse(sanitizedContent);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar o post: {error.message || 'Erro desconhecido'}</div>;
    if (!post) return <div>Post não encontrado</div>;

    return (
        <article className={styles.postContainer}>
            <header className={styles.headerContainer}>
                <h1 className={styles.postTitle}>{post.title || 'Título não encontrado'}</h1>
                <p className={styles.postDate}>Publicado em: {dataFormatada || 'Data não encontrada'}</p>
                <AuthorBadge post={post} />
            </header>

            <figure className={styles.imageContainer}>
                <img
                    src={post.image || '/default-image.jpg'}
                    alt={post.title}
                    className={styles.postImage}
                />
            </figure>

            <section className={styles.contentContainer}>
                {/* Corpo completo do post, se existir */}
                {post.content && (
                    <div className={styles.fullContent}>
                        {renderContent(post.content)}
                    </div>
                )}
            </section>

            <footer className={styles.postFooter}>
                <p><strong>Visualizações:</strong> {post.views}</p>
                {/* <p><strong>Likes:</strong> {post.likes} | <strong>Dislikes:</strong> {post.dislikes}</p> */}
                <div className={styles.interactionButtons}>
                    <button 
                        onClick={handleLike}
                        disabled={!isAuthenticated}
                        className={styles.likeButton}
                    >
                        👍 {post.likes}
                    </button>
                    <button 
                        onClick={handleDislike}
                        disabled={!isAuthenticated}
                        className={styles.dislikeButton}
                    >
                        👎 {post.dislikes}
                    </button>
                </div>
                <div className={styles.tags}>
                    {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </footer>
        </article>
    );
}

export default OpenedPost;