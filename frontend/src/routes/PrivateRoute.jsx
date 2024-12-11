import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {

  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('Token não encontrado.');
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;