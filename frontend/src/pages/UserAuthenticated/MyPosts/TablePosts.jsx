const TablePosts = ({ posts, onEdit, onDelete }) => (
    <table>
        <thead>
            <tr>
                <th>Título</th>
                <th>Visualizações</th>
                <th>Likes</th>
                <th>Deslikes</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <tr key={post._id}>
                        <td>{post.title}</td>
                        <td>{post.views || 0}</td>
                        <td>{post.likes || 0}</td>
                        <td>{post.dislikes || 0}</td>
                        <td>
                            <button onClick={() => onEdit(post._id)}>Editar</button>
                            <button onClick={() => onDelete(post._id)}>Excluir</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5">Nenhum post encontrado.</td>
                </tr>
            )}
        </tbody>
    </table>
);

export default TablePosts;  