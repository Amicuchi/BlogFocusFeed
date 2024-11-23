import { useState } from 'react';
import { postService } from '../../services/postService';

function PostEditor () {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost({
        ...formData,
        date: new Date().toISOString(),
        author: 'Admin'
      });
      alert('Post criado com sucesso!');
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        tags: []
      });
    } catch (error) {
      alert('Erro ao criar post: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Criar Novo Post</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resumo</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL da Imagem</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (separadas por vírgula)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              tags: e.target.value.split(',').map(tag => tag.trim())
            }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Publicar Post
        </button>
      </div>
    </form>
  );
};

export default PostEditor;