import PropTypes from "prop-types";
import styles from "./Modal.module.css";

function Modal({ title, children, onClose }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <header className={styles.modalHeader}>
                    <div className={styles.modalTitle}>
                        <h3>{title}</h3>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        &times;
                    </button>
                </header>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;