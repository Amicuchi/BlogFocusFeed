import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PostList from "../../components/PostList/PostList";
import styles from "./FilteredPosts.module.css";
import apiServices from "../../services/apiServices";

function FilteredPosts() {
    const { categoryId } = useParams();             // Hook para obter os parâmetros da URL
    const location = useLocation();                 // Hook para obter a localização
    const { categoryName } = location.state || {};  // Obtém o nome da categoria do estado enviado via Link
    const [posts, setPosts] = useState([]);         // Estado para armazenar os posts
    const [loading, setLoading] = useState(true);   // Estado para exibir carregamento  
    const [error, setError] = useState(null);       // Estado para exibir mensagens de erro

    useEffect(() => {
        async function getFilteredPosts() {
            try {
                setLoading(true);                   // Inicia o indicador de carregamento
                const response = await apiServices.getPostsByCategory(categoryId);
                setPosts(response.data.data);       // Define os posts no estado
                setError(null);                     // Limpa o estado de erro
            } catch (error) {
                console.error("Erro ao buscar posts por categoria:", error);
                setError(error.response?.data?.message || "Erro ao carregar os posts.");
            } finally {
                setLoading(false);
            }
        }

        getFilteredPosts();
    }, [categoryId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (posts.length === 0) {
        return (
            <div className={styles.noPosts}>
                Nenhum post encontrado para esta categoria.
            </div>
        );
    }

    return (
        <main className={styles.filteredPostsContainer}>
            <h2 className={styles.title}>
                {categoryName ? categoryName : "Categoria Indefinida"}
            </h2>
            <PostList posts={posts} />
        </main>
    )
}

export default FilteredPosts;