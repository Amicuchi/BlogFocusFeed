import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../../services/apiServices';
import styles from './Profile.module.css';

function Profile() {
  const [profile, setProfile] = useState(null);           // Dados do perfil
  const [loading, setLoading] = useState(true);           // Controle de carregamento (loading spinner)
  const [error, setError] = useState(null);               // Controle de erro
  const [editingField, setEditingField] = useState(null); // Campo em edição

  const [formData, setFormData] = useState({              // Dados do formulário
    fullName: '',
    bio: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  // Busca o perfil do usuário
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await apiServices.getUserProfile();
        const profileData = response.data.data;
        setProfile(profileData); // Atualiza o perfil no estado
        setFormData(profileData); // Atualiza os campos editáveis
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setError(error.response?.data?.message || 'Erro ao carregar perfil.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Atualiza os campos editáveis do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];   // Extração da chave (ex.: github, linkedin)
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value }    // Atualiza o campo específico
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));     // Atualiza os campos simples
    }
  };

  // Salva alterações de um campo individualmente
  const handleSaveField = async () => {
    try {
      const updatedData = { ...formData };
      const response = await apiServices.updateUserProfile(updatedData);
      setProfile(response.data.data);
      setEditingField(null); // Sai do modo de edição
      alert('Campo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setError('Erro ao atualizar o perfil:', error.response?.data?.message || 'Erro desconhecido.');
      alert('Erro ao salvar o campo. Por favor, tente novamente.');
    }
  };

  // Dados formatados para exibição
  const username = profile?.username || 'N/A';
  const email = profile?.email || 'N/A';
  const createdAt = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : 'N/A';

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return null;

  return (
    <main className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Perfil de {profile?.fullName || 'N/A'}</h2>
      <div className={styles.profileDetails}>
        {/* Dados não editáveis */}
        <p><strong>Nome de usuário: </strong> {username}</p>
        <p><strong>E-mail: </strong> {email}</p>
        <p><strong>Cadastrado desde: </strong> {createdAt}</p>
      </div>

      {/* Dados editáveis */}
      <form className={styles.profileForm}>
        <EditableField
          label="Nome completo"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />
        <EditableTextField
          label="Biografia"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />
        <EditableField
          label="Localização"
          name="location"
          value={formData.location}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />

        {/* Links sociais */}
        {['github', 'linkedin', 'twitter'].map((key) => (
          <EditableField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            name={`socialLinks.${key}`}
            value={formData.socialLinks[key] || ''}
            onChange={handleChange}
            onSave={handleSaveField}
            editingField={editingField}
            setEditingField={setEditingField}
          />
        ))
        }
      </form>
    </main>
  );
}

function EditableField({ label, name, value, onChange, onSave, editingField, setEditingField }) {
  const isEditing = editingField === name;

  return (
    <div className={styles.editableField}>
      <strong>{label}:</strong>
      <label className={styles.label}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={!isEditing} // Desabilita se não estiver no modo de edição
          className={styles.inputField}
        />

        {isEditing ? (
          <button
            type="button"
            onClick={() => onSave(name)}
            className={styles.saveButton}
          >
            Salvar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditingField(name)}
            className={styles.editButton}
          >
            Editar
          </button>
        )}
      </label>
    </div>
  );
}

function EditableTextField({ label, name, value, onChange, onSave, editingField, setEditingField }) {
  const isEditing = editingField === name;

  return (
    <div className={styles.editableField}>
      <strong>{label}:</strong>
      <label className={styles.label}>
        <textarea
          type="text"
          rows={5}
          name={name}
          value={value}
          onChange={onChange}
          disabled={!isEditing} // Desabilita se não estiver no modo de edição
          className={styles.inputField}
        />

        {isEditing ? (
          <button
            type="button"
            onClick={() => onSave(name)}
            className={styles.saveButton}
          >
            Salvar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditingField(name)}
            className={styles.editButton}
          >
            Editar
          </button>
        )}
      </label>
    </div>
  );
}

// Validação de props
EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editingField: PropTypes.string,
  setEditingField: PropTypes.func.isRequired,
};

EditableTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editingField: PropTypes.string,
  setEditingField: PropTypes.func.isRequired,
};

export default Profile;