import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/authContext';

const AuthRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  const render = (props) => {
    // if (loading) return 'Loading';
    if (!isAuthenticated) return <Component {...props} />;

    return <Redirect to='/' />;
  };

  return <Route {...rest} render={render} />;
};

export default AuthRoute;
