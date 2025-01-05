import { useEffect, useState } from "react";
import apiServices from "../../../../services/apiServices";
import RenderTable from "./renderTable";

const PostsTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiServices.get("/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, []);

  const headers = ["Título", "Autor", "Data", "Ações"];

  const renderRow = (post) => (
    <tr key={post.id}>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.date}</td>
      <td>
        <button onClick={() => console.log("Editar", post.id)}>Editar</button>
        <button onClick={() => console.log("Excluir", post.id)}>Excluir</button>
      </td>
    </tr>
  );

  return <RenderTable headers={headers} data={posts} renderRow={renderRow} />;
};

export default PostsTable;
