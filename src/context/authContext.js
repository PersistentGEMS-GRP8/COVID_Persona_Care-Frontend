import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import * as userService from '../services/userService';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const verifyJwtToken = (token) => {
    // Checks for the validity
    const decode = jwtDecode(token);
    const now = new Date();
    if (decode.exp * 1000 < now.getTime()) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setInitialLoad(false);
      return;
    }

    const isTokenValid = verifyJwtToken(token);
    if (!isTokenValid) {
      history.push('/login');
      setInitialLoad(false);
      return;
    }

    // Get current user details api call
    // Set the user
    // Set the route according to user role
    setInitialLoad(false);
  }, []);

  const login = () => {
    setLoading(true);
    try {
      // Login API call
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, contactNo, password) => {
    setLoading(true);
    const userData = { name, email, contactNo, password };
    try {
      const { data } = await userService.register(userData);
      history.replace('/manager/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 400)
        setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    signUp,
  }));

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoad && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
