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
import authService from '../services/auth-service';
import Roles from '../constants/roles';

const AuthContext = createContext({});

const TOKEN = 'token';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: '' });
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const verifyJwtToken = (decode) => {
    // Checks for the validity

    const now = new Date();
    if (decode.exp * 1000 < now.getTime()) {
      localStorage.removeItem(TOKEN);
      console.log('token expired');
      return false;
    }
    return true;
  };

  const getUserRole = (decodedToken) => {
    if (decodedToken.isAdmin) return Roles.ADMIN;
    if (decodedToken.isHospitalAdmin) return Roles.HOSPITAL_ADMIN;
    if (decodedToken.isManager) return Roles.HOSPITAL_MANAGER;

    return '';
  };

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) {
      setInitialLoad(false);
      return;
    }

    const decode = jwtDecode(token);

    const isTokenValid = verifyJwtToken(decode);
    if (!isTokenValid) {
      history.push('/login');
      setInitialLoad(false);
      return;
    }

    const role = getUserRole(decode);
    // get user info api call
    setToken(token);
    setUser({ ...user, role });
    setIsAuthenticated(true);
    // handleRoute(role);

    setInitialLoad(false);
  }, []);

  const handleRoute = (role) => {
    const { state } = location;
    if (state) history.replace(state.from.pathname);
    switch (role) {
      case Roles.ADMIN:
        history.replace('/adminDashboard');
        return;

      case Roles.HOSPITAL_ADMIN:
        history.replace('/manageHadmins');

      case Roles.HOSPITAL_MANAGER:
        history.replace('/manager/dashboard');
        return;

      default:
        history.replace('/');
    }
  };

  const login = async (username, password) => {
    setLoading(true);

    try {
      const { data } = await authService.login(username, password);
      const token = data.token;
      const decode = jwtDecode(token);
      const role = getUserRole(decode);
      // get user info api call
      setToken(token);
      setUser({ ...user, role });
      setIsAuthenticated(true);
      handleRoute(role);
      localStorage.setItem(TOKEN, token);
      // console.log(role);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data);
        console.log(err.response.data);
      }
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

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setUser({ role: '' });
    setIsAuthenticated(false);
    setToken(null);
  };

  const memoedValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    signUp,
    logout,
    token,
    isAuthenticated,
  }));

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoad && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const token = localStorage.getItem(TOKEN);

export { AuthProvider, useAuth, token };
