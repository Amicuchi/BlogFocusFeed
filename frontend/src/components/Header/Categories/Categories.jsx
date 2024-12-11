import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Categories.module.css';

function Categories() {
    const [categories, setCategories] = useState([]);   // Estado para armazenar categorias
    const [error, setError] = useState(null);           // Estado para exibir mensagens de erro
    const [isLoading, setIsLoading] = useState(true);   // Estado para exibir carregamento

    // Função assíncrona para buscar categorias no backend
    const getCategories = async () => {
        try {
            setIsLoading(true); // Inicia o indicador de carregamento
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data.data); // Atualiza o estado com as categorias
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
            setError('Erro ao carregar categorias. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false); // Finaliza o indicador de carregamento
        }
    };

    // useEffect para buscar categorias na montagem do componente
    useEffect(() => {
        getCategories();
    }, []);

    // Renderização condicional para mensagens de erro, carregamento ou conteúdo
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
            {isLoading ? (
                    <li className={styles.navItem}>
                        <span className={styles.loading}>Carregando...</span>
                    </li>
                ) : error ? (
                    <li className={styles.navItem}>
                        <span className={styles.error}>{error}</span>
                    </li>
                ) : categories.length > 0 ? (
                    categories.map((categoria) => (
                        <li key={categoria._id} className={styles.navItem}>
                            <Link
                                className={styles.navLink}
                                to={`/category/${categoria._id}`}
                            >
                                {categoria.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className={styles.navItem}>
                        <span className={styles.message}>Nenhuma categoria encontrada.</span>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Categories;