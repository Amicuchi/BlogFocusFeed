import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/PostList/PostList"; // Substituir PostCard por PostList
import styles from "./FilteredPosts.module.css";
import axios from "axios";

function FilteredPosts() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [categorieName, setCategorieName] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getFilteredPosts() {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:5000/api/posts/category/${categoryId}`); // Busca os posts por categoria
                console.log(response.data);
                const responseCategorie = await axios.get('http://localhost:5000/api/categories');          // Busca as categorias para encontrar o nome da categoria pelo ID
                const categorie = responseCategorie.data.data.find((categorie) => categorie._id === categoryId);
                setCategorieName(categorie.name);
                setPosts(response.data.data); // Define os posts no estado
                setCategory(response.data.category?.name || "Categoria Desconhecida"); // Verifica se a categoria existe
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar posts por categoria:", err);
                setError(err.response?.data?.message || "Erro ao carregar os posts.");
            } finally {
                setLoading(false);
            }
        }

        getFilteredPosts();
    }, [categoryId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (posts.length === 0)
        return (
            <div className={styles.noPosts}>
                Nenhum post encontrado para esta categoria.
            </div>
        );

    return (
        <main className={styles.filteredPostsContainer}>
            <h2 className={styles.title}>
                {categorieName ? `${categorieName}` : ""}
            </h2>
            <PostList posts={posts} />
        </main>
    )
}

export default FilteredPosts;