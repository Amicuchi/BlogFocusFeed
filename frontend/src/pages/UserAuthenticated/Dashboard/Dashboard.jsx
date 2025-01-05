import { useState } from "react";
import UserTable from "./components/UserTable";
import PostsTable from "./components/PostsTable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("users")}>Usuários</button>
        <button onClick={() => setActiveTab("posts")}>Posts</button>
      </div>
      <div>
        {activeTab === "users" && <UserTable />}
        {activeTab === "posts" && <PostsTable />}
      </div>
    </div>
  );
};

export default Dashboard;
