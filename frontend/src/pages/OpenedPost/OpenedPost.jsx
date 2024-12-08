import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormatarData } from '../../hooks/useFormatarData.js';
import apiServices from '../../services/apiServices.js';
import AuthorBadge from '../../components/AuthorBadge/AuthorBadge';
import styles from './OpenedPost.module.css';

function OpenedPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dataFormatada = useFormatarData(post?.createdAt);

    useEffect(() => {
        const getPost = async () => {
            try {
                setLoading(true);
                const response = await apiServices.getPostById(id);
                console.log('Resposta completa:', response); // Log da resposta completa
                console.log('Dados do post:', response.data); // Log dos dados
                setPost(response.data);
                setError(null);
            } catch (error) {
                setError(error);
                console.error('Erro ao buscar o post:', error);
            } finally {
                setLoading(false);
            }
        }
        getPost();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar o post: {error.message || 'Erro desconhecido'}</div>;
    if (!post) return <div>Post não encontrado</div>;

    return (
        <article className={styles.postContainer}>
            <div className={styles.headerContainer}>
                <h1 className={styles.postTitle}>{post.title || 'Título não encontrado'}</h1>
                <p className={styles.postDate}>{dataFormatada || 'Data não encontrada'}</p>
                <AuthorBadge post={post} />
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={post.image || '/default-image.jpg'}
                    alt={post.title}
                    className={styles.postImage}
                />
            </div>

            <div className={styles.contentContainer}>
                {/* Corpo completo do post, se existir */}
                {post.content && (
                    <div className={styles.fullContent}>
                        {post.content || 'Lorem Ipsun'}
                    </div>
                )}
            </div>
        </article>
    );
}

export default OpenedPost;