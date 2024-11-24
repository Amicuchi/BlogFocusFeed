import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  excerpt: Yup.string().required('Resumo é obrigatório'),
  content: Yup.string().required('Conteúdo é obrigatório'),
  image: Yup.string().url('Deve ser uma URL válida'),
  tags: Yup.string().required('Tags são obrigatórias'),
});

function CreatePost() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((tag) => tag.trim()),
        }),
      });

      if (!response.ok) throw new Error('Falha ao criar post');
      alert('Post criado com sucesso!');
      setFormData({ title: '', excerpt: '', content: '', image: '', tags: '' });
    } catch (err) {
      if (err.name === 'ValidationError') {
        alert(err.errors.join('\n')); // Exibe todos os erros de validação
      } else {
        alert(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        placeholder="Resumo"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Conteúdo"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL da Imagem"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (separadas por vírgula)"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="btn-primary">
        Criar Post
      </button>
    </form>
  );
}

export default CreatePost;