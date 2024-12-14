import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import RichTextEditor from "./RichTextEditor";
import Select from "react-select";
import { NewPostSchema } from "./NewPostSchema";
import styles from "./NewPost.module.css";
import apiServices from "../../../services/apiServices";

function NewPost() {
  // Configuração do react-hook-form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewPostSchema),
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Função para buscar categorias do backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await apiServices.getAllCategories();
        setCategories(
          response.data.data.map((categories) => ({
            value: categories._id,
            label: categories.name,
          }))
        );
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        setError("Erro ao carregar categorias. Tente novamente.");
        toast.error("Erro ao carregar categorias.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
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
      
      await apiServices.createPost(postData);
      toast.success('Post publicado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro completo:', error.response?.data);
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao publicar post.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Post</h1>
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
                {...field}
                onContentChange={(value) => setValue("content", value, { shouldValidate: true })}
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
          {loading ? "Salvando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;