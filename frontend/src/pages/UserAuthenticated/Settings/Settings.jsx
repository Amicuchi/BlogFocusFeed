import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Components/Modal";
import EmailForm from "./Components/EmailForm";
import DeletionForm from "./Components/DeletionForm";
import ResetPassword from "./Components/ResetPassword";
import styles from "./Settings.module.css";

function Settings() {
  const [modalContent, setModalContent] = useState(null);

  // Funções para abrir o modal com conteúdo específico
  const openAccountModal = () =>
    setModalContent({
      title: "Alterar Endereço de E-mail",
      content: <EmailForm onClose={() => setModalContent(null)} />,
    });

  const openPasswordModal = () =>
    setModalContent({
      title: "Alterar Senha",
      content: <ResetPassword onClose={() => setModalContent(null)} />,
    });

  const openDeletionModal = () =>
    setModalContent({
      title: "Excluir Conta",
      content: <DeletionForm onClose={() => setModalContent(null)} />,
    });

  return (
    <section className={styles.settingsContainer}>
      <header>
        <h2>Configurações da Conta</h2>
        <p>Gerencie suas informações e preferências.</p>
      </header>

      <article className={styles.options}>
        <button onClick={openAccountModal} className={styles.submitBtn}>Alterar Endereço de E-mail</button>
        <button onClick={openPasswordModal} className={styles.submitBtn}>Alterar Senha</button>
        <button onClick={openDeletionModal} className={styles.dangerButton}>
          Excluir Conta
        </button>
      </article>
      
      {/* Modal */}
      {modalContent && (
        <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
          {modalContent.content}
        </Modal>
      )}
    </section>
  );
}

Settings.propTypes = {
  handleAccountChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  handleAccountDeletion: PropTypes.func,
};

export default Settings;