import { useState } from "react";
import apiServices from "../../../../services/apiServices.js";
import PropTypes from "prop-types";
import styles from "./Form.module.css";

function EmailForm({ onClose }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiServices.updateUserProfile({ email });
            setSuccess("E-mail atualizado com sucesso!");
            setTimeout(onClose, 2000); // Fechar após 2 segundos
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao atualizar o e-mail.");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu novo e-mail"
                required
            />
            <div className={styles.formActions}>
                <button
                    className={styles.submitBtn}
                    type="submit"
                >
                    Salvar
                </button>
                <button
                    className={styles.dangerButton}
                    type="button"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

EmailForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default EmailForm;