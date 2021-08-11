import http from './httpService';

const register = (user) => {
  return http.post('/register', {
    username: user.name,
    password: user.password,
    role: 'PATIENT',
  });
};

export { register };
