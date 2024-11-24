import { Link } from "react-router-dom";

function NavigationBar() {
  const categories = [
    { name: 'Início', path: '/' },
    { name: 'Brasil', path: '/categoria/brasil' },
    { name: 'Mundo', path: '/categoria/mundo' },
    { name: 'Curiosidades', path: '/categoria/curiosidades' },
    { name: 'Futebol', path: '/categoria/futebol' },
    { name: 'Fofocas', path: '/categoria/fofocas' }
  ];

  return (
    <nav className="bg-gray-100 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto whitespace-nowrap py-3">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;