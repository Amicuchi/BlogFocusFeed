import PropTypes from 'prop-types'; // Importa prop-types
import { Link } from 'react-router-dom';

function UserMenu({ user }) {
  const menuItems = [
    { label: 'Perfil', path: '/perfil' },
    { label: 'Configurações', path: '/configuracoes' },
    { label: 'Meus Posts', path: '/meus-posts' },
    { label: 'Novo Post', path: '/novo-post' },
    { label: 'Sair', action: handleLogout },
  ];

  function handleLogout() {
    console.log('Usuário deslogado');
    // Implementar lógica de logout
  }

  return (
    <div className="relative">
      <button className="flex items-center space-x-2">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            {user.name[0].toUpperCase()}
          </div>
        )}
        <span>Olá, {user.name}</span>
      </button>
      <ul className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
        {menuItems.map((item) =>
          item.path ? (
            <li key={item.label}>
              <Link to={item.path} className="block px-4 py-2 hover:bg-gray-100">
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.label}>
              <button
                onClick={item.action}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {item.label}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

// Validação de props
UserMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default UserMenu;
