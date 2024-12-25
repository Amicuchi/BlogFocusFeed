import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../../services/apiServices';
import avatar from '../../../assets/img/avatar.png';
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
    profilePicture: '',
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
        const { data: { data: profileData } } = await apiServices.getUserProfile();

        // Garantir que socialLinks existe
        const normalizedData = {
          ...profileData,
          socialLinks: profileData.socialLinks || {
            github: '',
            linkedin: '',
            twitter: ''
          }
        };

        setProfile(normalizedData);  // Atualiza o perfil no estado
        setFormData(normalizedData); // Atualiza os campos editáveis
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setError(error.response?.data?.message || 'Erro ao carregar perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Atualiza os campos editáveis do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];   // Extração da chave (ex.: github, linkedin)
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Salva alterações de um campo individualmente
  const handleSaveField = async () => {
    try {
      const { data: { data: updatedProfile } } = await apiServices.updateUserProfile(formData);

      const normalizedProfile = {
        ...updatedProfile,
        socialLinks: updatedProfile.socialLinks || {
          github: '',
          linkedin: '',
          twitter: ''
        }
      };

      setProfile(normalizedProfile);
      setFormData(normalizedProfile);
      setEditingField(null);
      alert('Campo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setError('Erro ao atualizar o perfil:', error.response?.data?.message || 'Erro desconhecido.');
      alert('Erro ao salvar o campo. Por favor, tente novamente.');
    }
  };
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return null;

  return (
    <main className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Perfil de {profile.fullName || 'N/A'}</h2>

      <div className={styles.profileDetails}>
        <div className={styles.imageContainer}>
          <img
            src={profile.profilePicture || avatar}
            alt={`Foto de ${profile.username || 'N/A'}`}
            className={styles.profilePicture}
          />
          {!editingField ? (
            <button
              type="button"
              onClick={() => setEditingField('profilePicture')}
              className={styles.editButton}
            >
              Editar Imagem
            </button>
          ) : editingField === 'profilePicture' && (
            <EditableField
              label="URL da Imagem"
              name="profilePicture"
              value={formData.profilePicture || ''}
              onChange={handleChange}
              onSave={handleSaveField}
              editingField={editingField}
              setEditingField={setEditingField}
              className={styles.imageUrlInput}
            />
          )}
        </div>

        <div>
          <p><strong>Nome de usuário: </strong> {profile.username || 'N/A'}</p>
          <p><strong>E-mail: </strong> {profile.email || 'N/A'}</p>
          <p><strong>Cadastrado desde: </strong>
            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Dados editáveis */}
      <form className={styles.profileForm}>
        <EditableField
          label="Nome completo"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />
        <EditableTextField
          label="Biografia"
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />
        <EditableField
          label="Localização"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          onSave={handleSaveField}
          editingField={editingField}
          setEditingField={setEditingField}
        />

        {/* Links sociais */}
        {Object.entries(formData.socialLinks).map(([key, value]) => (
          <EditableField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            name={`socialLinks.${key}`}
            value={value}
            onChange={handleChange}
            onSave={handleSaveField}
            editingField={editingField}
            setEditingField={setEditingField}
          />
        ))}
      </form>
    </main>
  );
}

function EditableField({
  label,
  name,
  value,
  onChange,
  onSave,
  editingField,
  setEditingField,
  className
}) {
  const isEditing = editingField === name;

  return (
    <div className={`${styles.editableField} ${className || ''}`}>
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
            onClick={onSave}
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

function EditableTextField(props) {
  const isEditing = props.editingField === props.name;

  return (
    <div className={styles.editableField}>
      <strong>{props.label}:</strong>
      <label className={styles.label}>
        <textarea
          type="text"
          rows={5}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={!isEditing}
          className={styles.inputField}
        />

        {isEditing ? (
          <button
            type="button"
            onClick={props.onSave}
            className={styles.saveButton}
          >
            Salvar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => props.setEditingField(props.name)}
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
const EditableFieldPropTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editingField: PropTypes.string,
  setEditingField: PropTypes.func.isRequired,
  className: PropTypes.string
};

EditableField.propTypes = EditableFieldPropTypes;
EditableTextField.propTypes = EditableFieldPropTypes;

export default Profile;