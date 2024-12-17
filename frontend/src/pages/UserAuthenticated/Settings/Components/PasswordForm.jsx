import PropTypes from "prop-types";
import styles from "./Form.module.css";

function PasswordForm({ onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar a nova senha
        console.log("Senha atualizada!");
        onClose();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Nova Senha:
                <input type="password" placeholder="Digite sua nova senha" required />
            </label>
            <label>
                Confirmar Senha:
                <input type="password" placeholder="Confirme sua nova senha" required />
            </label>
            <div className={styles.formActions}>
                <button type="submit">Salvar</button>
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

PasswordForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default PasswordForm;