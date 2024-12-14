import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import apiServices from '../../../services/apiServices';
import styles from './Profile.module.css';

function Profile() {
  const { logout } = useAuth();                     // Dados do usuário da autenticação
  const [profile, setProfile] = useState(null);     // Dados completos do perfil
  const [editMode, setEditMode] = useState(false);  // Controle de edição
  const [formData, setFormData] = useState({});     // Estado para os dados editáveis
  const [loading, setLoading] = useState(true);     // Controle de carregamento
  const [error, setError] = useState(null);         // Controle de erro

  useEffect(() => {
    // Busca os dados do perfil completo do usuário
    async function fetchProfile() {
      try {
        const response = await apiServices.getUserProfile();
        setProfile(response.data); // Define os dados no estado
        setFormData({
          fullName: response.data.fullName,
          bio: response.data.bio || '',
          location: response.data.location || '',
          socialLinks: {
            instagram: response.data.socialLinks?.instagram || '',
            twitter: response.data.socialLinks?.twitter || '',
            facebook: response.data.socialLinks?.facebook || '',
            linkedin: response.data.socialLinks?.linkedin || '',
            github: response.data.socialLinks?.github || '',
          },
        });
      } catch (error) {
        setError('Erro ao carregar perfil: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Atualiza os campos editáveis
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submete as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiServices.updateUserProfile(formData);
      setProfile(response.data);  // Atualiza os dados do perfil
      setEditMode(false);         // Sai do modo de edição
    } catch (error) {
      setError('Erro ao atualizar o perfil:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.profileContainer}>
      <h2>Perfil do Usuário</h2>
      <div className={styles.profileDetails}>
        {/* Dados não editáveis */}
        <p><strong>Nome de usuário:</strong> {profile.username}</p>
        <p><strong>Papel:</strong> {profile.role || 'Usuário'}</p>
        <p><strong>Cadastrado desde:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
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
            disabled={!editMode}
          />
        </label>
        <label>
          Biografia:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        <label>
          Localização:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        {/* Links sociais */}
        {Object.keys(formData.socialLinks).map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <input
              type="text"
              name={`socialLinks.${key}`}
              value={formData.socialLinks[key]}
              onChange={handleChange}
              disabled={!editMode}
            />
          </label>
        ))}

        {/* Botões de ação */}
        <div className={styles.actions}>
          {editMode ? (
            <>
              <button type="submit">Salvar Alterações</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setEditMode(true)}>
                Editar Perfil
              </button>
              <button type="button" onClick={logout}>
                Sair
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;