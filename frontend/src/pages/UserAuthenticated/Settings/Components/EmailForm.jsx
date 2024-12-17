import PropTypes from "prop-types";
import styles from "./Form.module.css";

function EmailForm({ onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar o novo e-mail
        console.log("E-mail atualizado!");
        onClose();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Novo E-mail:
                <input type="email" placeholder="Digite seu novo e-mail" required />
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

EmailForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default EmailForm;