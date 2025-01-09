import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NewPostSchema } from "./NewPostSchema";
import Select from "react-select";
import RichTextEditor from "./RichTextEditor";
import apiServices from "../../../services/apiServices";
import PropTypes from "prop-types";
import styles from "./PostForm.module.css";

function PostForm() {
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(NewPostSchema),
    });

    const { postId } = useParams(); // Obtemos o ID do post da URL
    const [categories, setCategories] = useState([]);
    const [postData, setPostData] = useState(null); // Dados do post para edição
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Função para buscar categorias do backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const response = await apiServices.getAllCategories();
                const mappedCategories = response.data.data.map((category) => ({
                    value: category._id,
                    label: category.name,
                }));
                setCategories(mappedCategories);

                // Se estiver editando, busca o post após carregar categorias
                if (postId) {
                    await fetchPost(mappedCategories);
                }
            } catch (err) {
                console.error("Erro ao carregar categorias:", err);
                setError("Erro ao carregar categorias. Tente novamente.");
                toast.error("Erro ao carregar categorias.");
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [postId, setValue]);

    const fetchPost = async (availableCategories) => {
        try {
            const response = await apiServices.getPostById(postId);
            const post = response.data.data;
            
            if (post.categories?.[0]) {
                const category = availableCategories.find(cat => cat.value === post.categories[0]);
                if (category) {
                    setValue("categories", category);
                }
            }

            setPostData(post);

            // Preenche os campos do formulário com os dados do post
            setValue("title", post.title);
            setValue("description", post.description);
            setValue("content", post.content);
            setValue("tags", Array.isArray(post.tags) ? post.tags.join(", ") : "");
            setValue("image", post.image);
        } catch (err) {
            console.error("Erro ao carregar post:", err);
            setError("Erro ao carregar post para edição.");
            toast.error("Erro ao carregar post.");
        }
    };

    const onSubmit = async (data) => {
        console.log("Dados do formulário:", data);
        setLoading(true);
        try {
            const postData = {
                title: data.title,
                description: data.description,
                content: data.content,
                categories: [data.categories?.value],
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
                image: data.image,
            };

            if (postId) {
                // Se postId existir, estamos editando, então chamamos a API para atualizar o post
                await apiServices.updatePost(postId, postData);
                toast.success('Post atualizado com sucesso!');
            } else {
                // Se não, criamos um novo post
                await apiServices.createPost(postData);
                toast.success('Post publicado com sucesso!');
            }

            navigate('/');
        } catch (error) {
            console.error('Erro completo:', error.response?.data);
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                "Erro ao salvar post.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loadingCategories) return <p>Carregando categorias...</p>;
    if (!postId && postData) return null; // Se estivermos no modo de edição, esperamos o postData ser carregado

    return (
        <div className={styles.PostFormContainer}>
            <h1 className={styles.title}>{postId ? 'Editar Post' : 'Criar Post'}</h1>
            {error && <p className={styles.errorBanner}>{error}</p>}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <div className={styles.formGroup}>
                    <label>Título</label>
                    <input
                        {...register("title")}
                        className={styles.input}
                        placeholder="Digite o título do post"
                    />
                    {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Descrição</label>
                    <textarea
                        {...register("description")}
                        className={styles.textarea}
                        placeholder="Digite uma breve descrição"
                    />
                    {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Conteúdo</label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <RichTextEditor
                                initialValue={field.value}
                                onContentChange={(value) => setValue("content", value, { shouldValidate: true })}
                                allowedTags={['p', 'a', 'b', 'i', 'ul', 'ol', 'li', 'strong', 'em', 'h1', 'h2', 'h3', 'blockquote', 'hr', 'br', 'div', 'span', 'img']}
                            />
                        )}
                    />
                    {errors.content && <p className={styles.errorText}>{errors.content.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Categoria</label>
                    {loadingCategories ? (
                        <p>Carregando categorias...</p>
                    ) : (
                        <Controller
                            name="categories"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={categories}
                                    placeholder="Selecione uma categoria"
                                />
                            )}
                        />
                    )}
                    {errors.categories && <p className={styles.errorText}>{errors.categories.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Imagem (URL)</label>
                    <input
                        {...register("image")}
                        className={styles.input}
                        placeholder="Cole o link da imagem"
                    />
                    {errors.image && <p className={styles.errorText}>{errors.image.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Tags</label>
                    <input
                        type="text"
                        name="tags"
                        className={styles.input}
                        {...register("tags")}
                        placeholder="Tags (separadas por vírgula)"
                    />
                    {errors.tags && <p className={styles.errorText}>{errors.tags.message}</p>}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? "Salvando..." : postId ? "Salvar alterações" : "Publicar"}
                </button>
            </form>
        </div>
    );
};

PostForm.propTypes = {
    postId: PropTypes.string,
};
export default PostForm;