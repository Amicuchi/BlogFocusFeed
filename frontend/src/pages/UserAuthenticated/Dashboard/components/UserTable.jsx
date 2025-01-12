import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../../../../services/apiServices";
import Modal from "react-modal";
import Proptype from "prop-types";
import styles from "../Dashboard.module.css";
import EditRoleModal from "./EditRoleModal";

const UserTable = ({ loggedInUserRole }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuários filtrados
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Termo de busca por nome
  const [filterRole, setFilterRole] = useState(""); // Filtro por cargo

  Modal.setAppElement("#root");

  // Trecho responsável pela exibição de usuários cadastrados //
  useEffect(() => {
    fetchUsers();
  }, []);

  // Atualizar os usuários exibidos ao modificar a busca ou o filtro
  useEffect(() => {
    // Aplicar os filtros de busca e cargo
    const applyFilters = () => {
      let filtered = users;

      // Filtro por cargo
      if (filterRole) {
        filtered = filtered.filter((user) => user.role === filterRole);
      }

      // Busca unificada por nome ou email
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.fullName.toLowerCase().includes(lowerCaseQuery) ||
            user.email.toLowerCase().includes(lowerCaseQuery)
        );
      }

      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [searchQuery, filterRole, users]);

  // Retorna a lista de usuários
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiServices.listUsers();
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsers([]); // Caso ocorra um erro, definimos users como um array vazio
    } finally {
      setLoading(false);
    }
  };

  // Define o usuário a ser editado (selectedUser) e o cargo atual (newRole).
  const handleEditRole = (user) => {
    setSelectedUser(user); // Armazenar o usuário a ser editado
    setNewRole(user.role); // Definir o cargo atual como o novo cargo
    setIsModalOpen(true); // Abrir o modal
  };

  // Define os cargos que podem ser atribuídos com base no cargo do usuário logado
  //  - Proprietário (OWNER): Pode definir qualquer cargo.
  //  - Moderador (MODERATOR): Pode alterar apenas leitores ou autores.
  //  - Autor (AUTHOR) ou Leitor (READER): Não pode alterar cargos.
  const getRoleOptions = (loggedInUserRole, targetUserRole) => {
    if (loggedInUserRole === "OWNER") {
      return ["READER", "AUTHOR", "MODERATOR", "OWNER"];
    } else if (loggedInUserRole === "MODERATOR") {
      return targetUserRole === "READER" || targetUserRole === "AUTHOR"
        ? ["READER", "AUTHOR"]
        : [];
    }
    return [];
  };

  // Salva o novo cargo do usuário
  const handleSaveRole = async () => {
    if (!newRole || !selectedUser) {
      toast.error("Por favor, selecione um cargo válido.");
      return;
    }

    // Verificar se a nova função será "OWNER"
    if (newRole === "OWNER") {
      const confirmed = window.confirm(
        "Tem certeza que deseja promover este usuário a Proprietário (Owner)? Essa ação não pode ser desfeita, e você não poderá rebaixar este usuário no futuro."
      );
      if (!confirmed) {
        return; // Cancela a ação se o usuário não confirmar
      }
    }

    try {
      // Atualiza o cargo do usuário
      await apiServices.updateUserRole(selectedUser._id, newRole);

      toast.success("Cargo atualizado com sucesso!", {
        position: "top-center",
        autoClose: 3000,
      });

      fetchUsers(); // Atualiza a lista de usuários
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar cargo:", error);
      toast.error("Erro ao atualizar o cargo.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Trecho responsável pela exclusão de cargos
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await apiServices.deleteUser(userId);
      toast.success("Usuário excluído com sucesso!", {
        position: "top-center",
        autoClose: 3000,
      });

      fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      toast.error("Erro ao excluir usuário.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const roleTranslations = {
    READER: "Leitor",
    AUTHOR: "Autor",
    MODERATOR: "Moderador",
    OWNER: "Proprietário",
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <ToastContainer />

      {/* Filtros e Busca */}
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className={styles.roleFilter}
        >
          <option value="">Todos os cargos</option>
          <option value="READER">Leitor</option>
          <option value="AUTHOR">Autor</option>
          <option value="MODERATOR">Moderador</option>
          <option value="OWNER">Proprietário</option>
        </select>
      </div>

      {/* Tabela de Usuários */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id || index}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{roleTranslations[user.role]}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditRole(user)}
                  >
                    Editar Cargo
                  </button>
                  {loggedInUserRole === "OWNER" && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Excluir
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum usuário encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <EditRoleModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        selectedUser={selectedUser}
        newRole={newRole}
        setNewRole={setNewRole}
        getRoleOptions={getRoleOptions}
        loggedInUserRole={loggedInUserRole}
        handleSaveRole={handleSaveRole}
      />
    </div>
  );
};

UserTable.propTypes = {
  loggedInUserRole: Proptype.string.isRequired,
};

export default UserTable;
