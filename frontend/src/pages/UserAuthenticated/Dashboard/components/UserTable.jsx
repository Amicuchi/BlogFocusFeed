import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices from "../../../../services/apiServices";
import Modal from 'react-modal';
import Proptype from 'prop-types';
import styles from "./UserTable.module.css";

const UserTable = ({ loggedInUserRole }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar o modal
    const [selectedUser, setSelectedUser] = useState(null); // Estado para armazenar o usuário que está sendo editado
    const [newRole, setNewRole] = useState('');             // Estado para armazenar o novo cargo

    Modal.setAppElement('#root');

    // ******************************************************** //
    // Trecho responsável pela exibição de usuários cadastrados //
    // ******************************************************** //
    useEffect(() => {
        fetchUsers();
    }, []);
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

    // ****************************************
    // Trecho responsável pela edição de cargos
    // ****************************************

    // Define o usuário a ser editado (selectedUser) e o cargo atual (newRole).
    const handleEditRole = (user) => {
        setSelectedUser(user);  // Armazenar o usuário a ser editado
        setNewRole(user.role);  // Definir o cargo atual como o novo cargo
        setIsModalOpen(true);   // Abrir o modal
    };

    // Define os cargos que podem ser atribuídos com base no cargo do usuário logado
    //  - Proprietário (OWNER): Pode definir qualquer cargo.
    //  - Moderador (MODERATOR): Pode alterar apenas leitores ou autores.
    //  - Autor (AUTHOR) ou Leitor (READER): Não pode alterar cargos.
    const getRoleOptions = (loggedInUserRole, targetUserRole) => {
        if (loggedInUserRole === 'OWNER') {
            return ['READER', 'AUTHOR', 'MODERATOR'];
        } else if (loggedInUserRole === 'MODERATOR') {
            return targetUserRole === 'READER' || targetUserRole === 'AUTHOR'
                ? ['READER', 'AUTHOR']
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

        console.log("Dados enviados:", {
            targetUserId: selectedUser._id,
            newRole
        });

        try {
            // Atualiza o cargo do usuário
            await apiServices.updateUserRole(selectedUser._id, newRole);

            toast.success("Cargo atualizado com sucesso!", {
                position: "top-center",
                autoClose: 3000,
            });

            fetchUsers();           // Atualiza a lista de usuários
            setIsModalOpen(false);  // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar cargo:", error);
            toast.error('Erro ao atualizar o cargo:', error,
                {
                    position: "top-center",
                    autoClose: 3000,
                }
            );
        }
    };

    // ******************************************
    // Trecho responsável pela exclusão de cargos
    // ******************************************
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            await apiServices.deleteUser(userId);
            toast.success('Usuário excluído com sucesso!', {
                position: "top-center",
                autoClose: 3000,
            });
            fetchUsers(); // Atualiza a lista de usuários
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            toast.error('Erro ao excluir usuário:', error,
                {
                    position: "top-center",
                    autoClose: 3000,
                }
            );
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <ToastContainer />
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
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id || index}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => handleEditRole(user)}
                                    >
                                        Editar Cargo
                                    </button>
                                    {loggedInUserRole === 'OWNER' && (
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

            {/* Modal para edição de cargo */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Editar Cargo">
                <h2>Editar Cargo</h2>
                <div>
                    <label>Selecione o novo cargo:</label>
                    <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        {getRoleOptions(loggedInUserRole, selectedUser?.role).map((role) => (
                            <option key={role} value={role}>
                                {role === 'READER'
                                    ? 'Leitor (Reader)' : role === 'AUTHOR'
                                    ? 'Autor (Author)' : 'Moderador (Moderator)'
                                }
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={handleSaveRole}>Salvar</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

UserTable.propTypes = {
    loggedInUserRole: Proptype.string.isRequired,
};

export default UserTable;