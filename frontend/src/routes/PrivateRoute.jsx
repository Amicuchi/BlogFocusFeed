import { Navigate, Outlet } from 'react-router-dom';

  function decodeJWT(token) {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }

function PrivateRoute() {
  const token = localStorage.getItem('jwt_token');

  // Verifica se o token existe e não está expirado
  if (!token) {
    console.warn('Token não encontrado.');
    return <Navigate to="/login" />;
  }

  try {
    const decoded = decodeJWT(token);
    
    // Verifica se o token é válido e possui o campo `exp`
    if (!decoded || !decoded.exp) {
      console.error('Token inválido ou expiração ausente:', decoded);
      localStorage.removeItem('jwt_token');
      return <Navigate to="/login" />;
    }

    // Verifica se o token está expirado
    const isExpired = decoded.exp * 1000 < Date.now();

    // Se o token está expirado, remove-o e redireciona para o login
    if (isExpired) {
      console.warn('Token expirado:', decoded);
      localStorage.removeItem('jwt_token'); // Remove token expirado
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Erro ao validar o token JWT:', error);
    localStorage.removeItem('jwt_token'); // Remove token inválido
    return <Navigate to="/login" />;
  }

  // Renderiza o Outlet para rotas protegidas se tudo estiver OK
  return <Outlet />;
}

export default PrivateRoute;