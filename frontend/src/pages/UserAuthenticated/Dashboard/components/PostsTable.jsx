import { useEffect, useState } from "react";
import apiServices from "../../../../services/apiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "../../../../hooks/formatDate";
import { Link } from "react-router-dom";
import styles from "./PostsTable.module.css";

const PostTable = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [goToPage, setGoToPage] = useState("");

    const POSTS_PER_PAGE = 10;

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        try {
            setLoading(true);
            const response = await apiServices.listPosts(page, POSTS_PER_PAGE);
            setPosts(response.data.posts);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            toast.error("Erro ao buscar os posts. Tente novamente.", error,
                {
                    position: "top-center",
                    autoClose: 3000,
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

        try {
            await apiServices.adminDeletePost(postId);
            toast.success("Post excluído com sucesso!", {
                position: "top-center",
                autoClose: 3000,
            });
            fetchPosts(currentPage); // Atualiza a lista de posts na página atual
        } catch (error) {
            console.error("Erro detalhado ao excluir post:", error.response?.data);
            toast.error("Erro ao excluir o post. Tente novamente.", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleGoToPage = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(goToPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
            setGoToPage("");
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div className={styles.postContainer}>
            <ToastContainer />
            <div className={styles.postsList}>
                {posts.map((post, index) => (
                    <div key={post.id || index} className={styles.postCard}>
                        <div className={styles.postContent}>
                            {/* Coluna da Imagem */}
                            <div className={styles.imageColumn}>
                                <img
                                    src={post.image || '/placeholder-image.jpg'}
                                    alt={post.title}
                                    className={styles.thumbnail}
                                />
                            </div>

                            {/* Coluna das Informações */}
                            <div className={styles.infoColumn}>
                                {/* Linha Superior */}
                                <div className={styles.topRow}>
                                    <Link to={`/post/${post._id}`} className={styles.postLink}>
                                        <h3 className={styles.postTitle}>{post.title}</h3>
                                    </Link>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeletePost(post._id)}
                                    >
                                        Excluir
                                    </button>
                                </div>

                                {/* Linha Inferior */}
                                <div className={styles.bottomRow}>
                                    <span className={styles.authorInfo}>
                                        <strong>Autor:</strong> {post.author ? (post.author.fullName || post.author.username) : "Usuário Removido"}
                                    </span>
                                    <span className={styles.engagementInfo}>
                                        <span className={styles.likes}>
                                            <strong>Likes:</strong> {post.likes}
                                        </span>
                                        <span className={styles.dislikes}>
                                            <strong>Deslikes:</strong> {post.dislikes}
                                        </span>
                                    </span>
                                    <span className={styles.dateInfo}>
                                        <span className={styles.createdAt}>
                                            <strong>Criado:</strong> {formatDate(post.createdAt)}
                                        </span>
                                        {post.updatedAt && (
                                            <span className={styles.updatedAt}>
                                                <strong>Atualizado:</strong> {formatDate(post.updatedAt)}
                                            </span>
                                        )}
                                        <span className={styles.createdAt}>
                                            <strong>Visualizações:</strong> {post.views}
                                        </span>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de paginação */}
            <div className={styles.pagination}>
                <button
                    className={styles.paginationButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Anterior
                </button>
                {/* <span className={styles.paginationInfo}>
                    Página {currentPage} de {totalPages}
                </span> */}

                <form onSubmit={handleGoToPage} className={styles.pageForm}>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={goToPage}
                        onChange={(e) => setGoToPage(e.target.value)}
                        className={styles.pageInput}
                        placeholder={`${currentPage} de ${totalPages}`}
                    />
                    <button type="submit" className={styles.goToPageButton}>
                        Ir
                    </button>
                </form>

                <button
                    className={styles.paginationButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Próxima
                </button>
                <button
                    className={styles.paginationButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    Última
                </button>
            </div>
        </div>
    );
};

export default PostTable;