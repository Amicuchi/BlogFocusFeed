import PropTypes from 'prop-types';
import Login from '../pages/Login/Login';

function PrivateRoute({ children }) {

  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('Token não encontrado.');
    return <Login />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;