import { useState } from 'react';
import apiServices from '../../services/apiServices';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        // }
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

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
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