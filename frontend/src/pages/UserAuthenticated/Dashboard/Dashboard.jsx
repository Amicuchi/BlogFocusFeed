import { useState } from "react";
import UserTable from "./components/UserTable";
import PostsTable from "./components/PostsTable";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("users");  // Aba ativa

    return (
        <div className={styles.dashboard}>
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
            {activeTab === "users" && <UserTable />}
            {activeTab === "posts" && <PostsTable />}
          </div>
        </div>
      );
    };

export default Dashboard;