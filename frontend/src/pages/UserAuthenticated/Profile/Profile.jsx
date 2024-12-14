import { useEffect, useState } from 'react';
import apiServices from '../../../services/apiServices';
import styles from './Profile.module.css';

function Profile() {
  const [profile, setProfile] = useState(null);           // Estado para armazenar dados do perfil
  const [loading, setLoading] = useState(true);           // Controle de carregamento (loading spinner)
  const [error, setError] = useState(null);               // Controle de erro
  const [editingField, setEditingField] = useState(null); // Controle de campo em edição

  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  useEffect(() => {
    apiServices.getUserProfile()
      .then(response => {
        console.log('Resposta completa:', response);
        console.log('response.data:', response.data);
      })
      .catch(error => {
        console.error('Erro completo:', error);
        console.log('Detalhes do erro:', error.response);
      });
  }, []);
  
  // useEffect(() => {
  //   async function fetchProfile() {
  //     try {
  //       const response = await apiServices.getUserProfile();
  //       setProfile(response.data.data);   // Armazena o perfil completo
  //       setFormData(response.data.data);  // Preenche o formulário com os dados existentes

  //     } catch (error) {
  //       console.log('perfil:', profile);
  //       console.error('Erro ao carregar perfil:', error);
  //       setError(error.response?.data?.message || 'Erro ao carregar perfil.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchProfile();
  // }, []);

  // Atualiza os campos editáveis
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];   // Extração da chave (ex.: github, linkedin)
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },    // Atualiza o campo específico
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));     // Atualiza os campos simples
    }
  };

  // Submete as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiServices.updateUserProfile(formData);
      setProfile(response.data);  // Atualiza os dados do perfil
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setError('Erro ao atualizar o perfil:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return null;

  return (
    <div className={styles.profileContainer}>
      <h2>Perfil de {profile?.fullName || 'N/A'}</h2>
      <div className={styles.profileDetails}>
        {/* Dados não editáveis */}
        <p><strong>Nome de usuário:</strong> {profile?.username || 'N/A'}</p>
        <p><strong>Papel:</strong> {profile?.role || 'Leitor'}</p>
        <p><strong>Cadastrado desde:</strong> {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Dados editáveis */}
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <label>
          Nome completo:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={editingField !== 'fullName'}
          />
          <button
            type="button"
            onClick={() => setEditingField(editingField === 'fullName' ? null : 'fullName')}
          >
            ✏️
          </button>
        </label>
        <label>
          Biografia:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={editingField !== 'bio'}
          />
          <button
            type="button"
            onClick={() => setEditingField(editingField === 'bio' ? null : 'bio')}
          >
            ✏️
          </button>
        </label>
        <label>
          Localização:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={editingField !== 'location'}
          />
          <button
            type="button"
            onClick={() => setEditingField(editingField === 'location' ? null : 'location')}
          >
            ✏️
          </button>
        </label>

        {/* Links sociais */}
        {['github', 'linkedin', 'twitter'].map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <input
              type="text"
              name={`socialLinks.${key}`}
              value={formData.socialLinks?.[key] || ''}
              onChange={handleChange}
              disabled={editingField !== `socialLinks.${key}`}
            />
            <button
              type="button"
              onClick={() => setEditingField(editingField === `socialLinks.${key}` ? null : `socialLinks.${key}`)}
            >
              ✏️
            </button>
          </label>
        ))}

        {/* Botões de ação */}
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={!editingField} // Só ativa quando algum campo está em edição
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;