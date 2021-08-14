import http from './httpService';

const register = (user) => {
  return http.post('/register', {
    username: user.name,
    password: user.password,
    role: 'PATIENT',
  });
};

const getCurrentUser = () => http.get('/profile');

export { register, getCurrentUser };
