import { useState } from 'react';
import { Menu, Home, Newspaper, Settings, Search } from 'lucide-react';

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">FocusFeed</h1>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden"
          >
            <Menu className="text-gray-600" />
          </button>
        </div>
        
        <div className={`
          ${isMenuOpen ? 'block' : 'hidden'} 
          md:flex space-x-6 absolute md:static 
          top-16 left-0 w-full md:w-auto 
          bg-white md:bg-transparent 
          shadow-md md:shadow-none 
          p-4 md:p-0
        `}>
          <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
            <Home size={18} className="mr-2" /> Início
          </a>
          <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
            <Newspaper size={18} className="mr-2" /> Notícias
          </a>
          <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
            <Settings size={18} className="mr-2" /> Configurações
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="
                pl-10 pr-4 py-2 rounded-full 
                bg-gray-100 border-none 
                focus:ring-2 focus:ring-blue-300 
                transition-all
              "
            />
            <Search 
              size={20} 
              className="absolute left-3 top-3 text-gray-500" 
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;