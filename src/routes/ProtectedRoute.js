import Role from '../constants/roles';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const userHasRequiredRole = requiredRoles.includes(user.role);

  const render = (props) => {
    // console.log(props);
    if (isAuthenticated && userHasRequiredRole) return <Component {...props} />;
    if (!isAuthenticated)
      return (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    return <Redirect to='/' />;
  };

  return <Route {...rest} render={render} />;
};

ProtectedRoute.defaultProps = {
  requiredRoles: [],
};

export default ProtectedRoute;
