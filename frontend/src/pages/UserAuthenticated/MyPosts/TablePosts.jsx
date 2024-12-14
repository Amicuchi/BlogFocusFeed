import styles from './MyPosts.module.css';

const TablePosts = ({ posts, onEdit, onDelete }) => (
    <table className={styles.table}>
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
                        <button
                className={`${styles.button} ${styles.buttonEdit}`}
                onClick={() => onEdit(post._id)}
              >
                Editar
              </button>
              <button
                className={`${styles.button} ${styles.buttonDelete}`}
                onClick={() => onDelete(post._id)}
              >
                Excluir
              </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className={styles.noPosts}>
            Nenhum post encontrado.
          </td>
                </tr>
            )}
        </tbody>
    </table>
);
export default TablePosts;  