import { useEffect, useState } from "react";
import RenderTable from "./renderTable";
import apiServices from "../../../../services/apiServices";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiServices.getAllUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  const headers = ["Nome", "E-mail", "Cargo", "Ações"];

  const renderRow = (user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={() => console.log("Editar", user.id)}>Editar</button>
        <button onClick={() => console.log("Excluir", user.id)}>Excluir</button>
      </td>
    </tr>
  );

  return <RenderTable headers={headers} data={users} renderRow={renderRow} />;
};

export default UserTable;
