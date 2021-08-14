import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/authContext';

const AuthRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { isAuthenticated } = useAuth();

  const render = (props) => {
    if (!isAuthenticated) return <Component {...props} />;

    return <Redirect to='/' />;
  };

  return <Route {...rest} render={render} />;
};

export default AuthRoute;
