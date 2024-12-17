import PropTypes from "prop-types";
import styles from "./Form.module.css";

function DeletionForm({ onClose }) {
    const handleDelete = () => {
        // Lógica para exclusão da conta
        console.log("Conta excluída!");
        onClose();
    };

    return (
        <article className={styles.form} >

            <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            <div className={styles.formActions}>
                <button className={styles.dangerButton} onClick={handleDelete} >
                    Confirmar Exclusão
                </button>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </article>
    );
}

DeletionForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default DeletionForm;