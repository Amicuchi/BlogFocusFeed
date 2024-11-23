import { useState } from 'react';
import { Menu, Home, Newspaper, Settings, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigationItems = [
        { path: '/', icon: Home, label: 'Início' },
        { path: '/noticias', icon: Newspaper, label: 'Notícias' },
        { path: '/configuracoes', icon: Settings, label: 'Configurações' },
    ];

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        FocusFeed
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                        aria-label="Toggle menu"
                    >
                        <Menu className="text-gray-600" />
                    </button>
                </div>

                <div
                    className={`
            ${isMenuOpen ? 'block' : 'hidden'}
            md:flex space-x-6 absolute md:static
            top-16 left-0 w-full md:w-auto
            bg-white md:bg-transparent
            shadow-md md:shadow-none
            p-4 md:p-0
            z-50
            `}
                >
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Icon size={18} className="mr-2" />
                                {item.label}
                            </Link>
                        );
                    })}
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