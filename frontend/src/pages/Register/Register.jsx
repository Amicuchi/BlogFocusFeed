import { useState } from 'react';
import apiServices from '../../services/apiServices';
// import CryptoJS from 'crypto-js';
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

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Atualizar campos de redes sociais
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

    // Função para validar o formulário
    const validateForm = () => {
        const newErrors = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para hashear a senha com salt
    // const hashPassword = (password) => {
    //     const salt = CryptoJS.lib.WordArray.random(16).toString(); // Salt aleatório
    //     let hash = password;
    //     for (let i = 0; i < 5; i++) { // Múltiplas rodadas de hash
    //         hash = CryptoJS.SHA256(hash + salt).toString();
    //     }
    //     return { salt, hash };
    // };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // const { salt, hash } = hashPassword(formData.password);
            // const dataToSend = {
            //     ...formData,
            //     password: hash,
            //     salt
            // };
            const dataToSend = { ...formData };
            delete dataToSend.confirmPassword; // Remover campo de confirmação de senha

            const response = await apiServices.registerUser(dataToSend);

            alert(response.data.message || 'Cadastro realizado com sucesso!'); // Feedback de sucesso
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
            alert(error.response?.data?.message || 'Erro no cadastro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Cadastre-se</h2>
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
                    <h3>Redes Sociais (opcional)</h3>
                    {Object.keys(formData.socialLinks).map((platform) => (
                        <div key={platform} className={styles.socialLinkInput}>
                            <input
                                type="text"
                                name={`socialLinks.${platform}`}
                                value={formData.socialLinks[platform]}
                                onChange={handleChange}
                                placeholder={`Link do ${platform}`}
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