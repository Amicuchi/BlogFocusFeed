import { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
        bio: '',
        location: '',
        socialLinks: {
            instagram: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            github: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Tratamento para campos aninhados de redes sociais
        if (name.startsWith('socialLinks.')) {
            const socialLinkKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [socialLinkKey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validações
        if (!formData.username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
            newErrors.username = 'Nome de usuário inválido';
        }

        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Nome completo é obrigatório';
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'E-mail inválido';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }

        // Validação opcional de redes sociais (se preenchidas)
        const socialMediaValidations = {
            instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/,
            twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
            facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_]+\/?$/,
            linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
            github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/
        };

        Object.keys(formData.socialLinks).forEach(platform => {
            const link = formData.socialLinks[platform];
            if (link && !socialMediaValidations[platform].test(link)) {
                newErrors[`socialLinks.${platform}`] = `Link do ${platform} inválido`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Remover campo de confirmação de senha antes de enviar
        const { confirmPassword, ...dataToSend } = formData;

        setIsLoading(true);

        try {
            const response = await axios.post('/api/users/register', dataToSend);

            alert(response.data.message); // Feedback de sucesso

            // Limpar formulário
            setFormData({
                username: '',
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                profilePicture: '',
                bio: '',
                location: '',
                socialLinks: {
                    instagram: '',
                    twitter: '',
                    facebook: '',
                    linkedin: '',
                    github: ''
                }
            });
        } catch (error) {
            // Tratamento de erro
            alert(error.response?.data?.message || 'Erro no cadastro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nome Completo"
                    className={styles.inputField}
                />
                {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}

                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nome de Usuário"
                    className={styles.inputField}
                />
                {errors.username && <p className={styles.errorText}>{errors.username}</p>}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className={styles.inputField}
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    className={styles.inputField}
                />
                {errors.password && <p className={styles.errorText}>{errors.password}</p>}

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    className={styles.inputField}
                />
                {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}

                <input
                    type="text"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    placeholder="URL da Foto de perfil"
                    className={styles.inputField}
                />
                {errors.profilePicture && <p className={styles.errorText}>{errors.profilePicture}</p>}

                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Biografia"
                    className={styles.inputField}
                    rows="4"
                />
                {errors.bio && <p className={styles.errorText}>{errors.bio}</p>}

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Localização (Cidade/Estado/País)"
                    className={styles.inputField}
                />
                {errors.location && <p className={styles.errorText}>{errors.location}</p>}

                {/* Seção de Redes Sociais */}
                <div className={styles.socialLinksSection}>
                    <h3>Links de Redes Sociais (opcional)</h3>
                    {Object.keys(formData.socialLinks).map(platform => (
                        <div key={platform} className={styles.socialLinkInput}>
                            <input
                                type="text"
                                name={`socialLinks.${platform}`}
                                value={formData.socialLinks[platform]}
                                onChange={handleChange}
                                placeholder={`Link do ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                                className={styles.inputField}
                            />
                            {errors[`socialLinks.${platform}`] && (
                                <p className={styles.errorText}>
                                    {errors[`socialLinks.${platform}`]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default Register;