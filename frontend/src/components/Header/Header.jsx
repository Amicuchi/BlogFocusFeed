import { Link } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import NavigationBar from './NavigationBar';

function Header() {
  const isAuthenticated = true; // Simulação
  const user = { name: 'Anderson', avatar: null }; // Mock para exemplo

  return (
    <header className="bg-white shadow-sm">
      {/* Primeira linha: Logo e Login/User Menu */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FocusFeed
        </Link>
        {isAuthenticated ? (
          <UserMenu user={user} />
        ) : (
            <Link 
            to="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>

      {/* Segunda linha: Navegação por categorias */}
      <NavigationBar />
    </header>
  );
}

export default Header;