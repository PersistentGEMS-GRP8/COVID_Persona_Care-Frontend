import http from './httpService';

const register = (user) => {
  return http.post('/register', {
    ...user,
  });
};

const getCurrentUser = () => http.get('/profile');

export { register, getCurrentUser };
