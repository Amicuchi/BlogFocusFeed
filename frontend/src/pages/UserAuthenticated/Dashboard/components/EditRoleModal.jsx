import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./EditRoleModal.module.css"; // Caso use estilos separados

const EditRoleModal = ({
  isOpen,
  onRequestClose,
  selectedUser,
  newRole,
  setNewRole,
  getRoleOptions,
  loggedInUserRole,
  handleSaveRole,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Cargo"
      ariaHideApp={false}
    >
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.modalTitle}>Editar Cargo</h2>

          {/* Exibir informações do usuário */}
          {selectedUser && (
            <div className={styles.userInfo}>
              <p><strong>Usuário:</strong> {selectedUser.fullName}</p>
              <p><strong>E-mail:</strong> {selectedUser.email}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p>
                <strong>Cargo Atual:</strong>{" "}
                {selectedUser.role === "READER"
                  ? "Leitor"
                  : selectedUser.role === "AUTHOR"
                  ? "Autor"
                  : selectedUser.role === "MODERATOR"
                  ? "Moderador"
                  : "Proprietário"}
              </p>
            </div>
          )}
          <div className={styles.modalContent}>
            <label>Selecione o novo cargo:</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className={styles.selectRole}
            >
              {getRoleOptions(loggedInUserRole, selectedUser?.role).map(
                (role) => (
                  <option key={role} value={role}>
                    {role === "READER"
                      ? "Leitor"
                      : role === "AUTHOR"
                      ? "Autor"
                      : role === "MODERATOR"
                      ? "Moderador"
                      : "Proprietário"}
                  </option>
                )
              )}
            </select>
          </div>
          <div className={styles.actions}>
            <button onClick={handleSaveRole} className={styles.btnSalvar}>
              Salvar
            </button>
            <button onClick={onRequestClose} className={styles.btnCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// PropTypes para validação
EditRoleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  newRole: PropTypes.string.isRequired,
  setNewRole: PropTypes.func.isRequired,
  getRoleOptions: PropTypes.func.isRequired,
  loggedInUserRole: PropTypes.string.isRequired,
  handleSaveRole: PropTypes.func.isRequired,
};

export default EditRoleModal;
