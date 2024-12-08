import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { NewPostSchema } from "./NewPostSchema"; // Esquema de validação Yup
import { CompressImage } from "./CompressImage"; // Função para compressão de imagem

function NewPost() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Inicializa o editor RichText com tiptap
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Configuração do react-hook-form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(NewPostSchema), // Validação usando Yup
  });

  // Manipula upload e compressão de imagem
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const compressedFile = await CompressImage(file); // Comprime a imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Define o preview
      };
      reader.readAsDataURL(compressedFile);
      setValue("image", compressedFile); // Atualiza o valor no formulário
    }
  };

  // Envia os dados para a API
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", editor.getHTML());
      formData.append("category", data.category.value);
      formData.append(
        "tags",
        JSON.stringify(data.tags.map((tag) => tag.value))
      );

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axios.post("/api/posts", formData);
      navigate(`/post/${response.data.id}`);
    } catch (error) {
      console.error("Erro ao salvar post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Criar Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Título:</label>
          <input
            {...register("title")}
            placeholder="Digite o título do post"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            {...register("description")}
            placeholder="Digite uma breve descrição"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        {/* Editor de conteúdo (Rich Text) */}
        <div>
          <label>Conteúdo:</label>
          <EditorContent editor={editor} />
          {errors.content && <p>{errors.content.message}</p>}
        </div>

        <div>
          <label>Categoria:</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "tecnologia", label: "Tecnologia" },
                  { value: "inovacao", label: "Inovação" },
                ]}
                placeholder="Selecione uma categoria"
              />
            )}
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        {/* Campo para upload de imagem */}
        <div>
          <label>Imagem:</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept=".png,.jpg,.jpeg,.webp"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "200px" }}
            />
          )}
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <div>
          <label>Tags:</label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={[
                  { value: "tecnologia", label: "Tecnologia" },
                  { value: "inovacao", label: "Inovação" },
                ]}
                placeholder="Selecione tags"
              />
            )}
          />
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;