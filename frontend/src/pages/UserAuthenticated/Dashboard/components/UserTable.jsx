import { useEffect, useState } from "react";
import apiServices from "../../../../services/apiServices";
import styles from "./UserTable.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const handleEditRole = async (userId) => {
        const newRole = prompt("Digite o novo cargo (READER, AUTHOR, MODERATOR):");
        if (!newRole) return;

        try {
            await apiServices.updateUserRole(userId, newRole);
            toast.success('Cargo atualizado com sucesso!', {
                position: "top-center",
                autoClose: 3000,
            });
            fetchUsers(); // Atualiza a lista de usuários
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
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className={styles.editButton} onClick={() => handleEditRole(user.id)}>
                                        Editar Cargo
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>
                                        Excluir
                                    </button>
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
        </div>
    );
};

export default UserTable;
