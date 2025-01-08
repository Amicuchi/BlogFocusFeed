import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import PostsTable from "./components/PostsTable";
import styles from "./Dashboard.module.css";
import apiServices from "../../../services/apiServices";
import { useAuth } from "../../../contexts/AuthContext";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("users");  // Aba ativa
    const [role, setRole] = useState("");                 // Estado para o papel do usuário
    const { user } = useAuth();                           // Recupera os dados do usuário e função de logout

    // Obtém o papel (role) do usuário
    useEffect(() => {
        const fetchRole = async () => {
            if (user?.id) {
                try {
                    const userRole = await apiServices.getUserRole();
                    setRole(userRole.data.role);    // Retorna o papel do usuário e define o estado
                } catch (error) {
                    console.error("Erro ao buscar o papel do usuário:", error);
                }
            }
        };

        fetchRole();
    }, [user?.id]);

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>Painel de Controle</h1>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === "users" ? styles.active : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    Usuários
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "posts" ? styles.active : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
            </div>
            <div className={styles.content}>
                {activeTab === "users" && <UserTable loggedInUserRole={role} />}
                {activeTab === "posts" && <PostsTable loggedInUserRole={role} />}
            </div>
        </div>
    );
};

export default Dashboard;