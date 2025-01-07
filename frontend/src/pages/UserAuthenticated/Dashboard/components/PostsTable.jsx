import { useEffect, useState } from "react";
import apiServices from "../../../../services/apiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "../../../../hooks/formatDate";
import { Link } from "react-router-dom";
import styles from "../Dashboard.module.css";

const PostTable = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
            await apiServices.AdminDeletePost(postId);
            toast.success("Post excluído com sucesso!", {
                position: "top-center",
                autoClose: 3000,
            });
            fetchPosts(currentPage); // Atualiza a lista de posts na página atual
        } catch (error) {
            console.error("Erro ao excluir post:", error);
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

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <ToastContainer />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id || index}>
                            <td>
                                <Link to={`/post/${post._id}`} className={styles.postLink}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>{post.author.fullName}</td>
                            <td>{formatDate(post.createdAt)}</td>
                            <td>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginação */}
            <div className={styles.pagination}>
                <button
                    className={styles.paginationButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Anterior
                </button>
                <span className={styles.paginationInfo}>
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className={styles.paginationButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default PostTable;