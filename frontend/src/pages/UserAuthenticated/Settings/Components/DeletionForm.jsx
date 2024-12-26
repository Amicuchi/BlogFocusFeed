import { useState } from "react";
import apiServices from "../../../../services/apiServices.js";
import PropTypes from "prop-types";
import styles from "./Form.module.css";

function DeletionForm({ onClose }) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleDelete = async () => {
        try {
            await apiServices.deleteUser();
            setSuccess("Conta excluída com sucesso!");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao excluir a conta.");
        }
    };

    return (
        <article className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            
            <div className={styles.formActions}>
                <button
                    className={styles.dangerButton}
                    onClick={handleDelete}
                >
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