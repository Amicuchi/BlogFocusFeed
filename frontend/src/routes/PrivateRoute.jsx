import { Navigate, Outlet } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode'; // Importa todas as funções do módulo jwt-decode
// import PropTypes from 'prop-types';

// function PrivateRoute({ children }) {
  function PrivateRoute() {
  const token = localStorage.getItem('jwt_token');

  // Verifica se o token existe e não está expirado
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode.decode(token);            // Usa a função 'decode' explicitamente
    const isExpired = decoded.exp * 1000 < Date.now();  // Verifica se o token expirou

    // Se o token está expirado, remove-o e redireciona para o login
    if (isExpired) {
      localStorage.removeItem('jwt_token'); // Remove token expirado
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Erro ao decodificar o token JWT:', error);
    localStorage.removeItem('jwt_token'); // Remove token inválido
    return <Navigate to="/login" />;
  }

  // Retorna os filhos se o token for válido
  // return children;
  
  // Renderiza o Outlet para rotas protegidas
  return <Outlet />;
}

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default PrivateRoute;