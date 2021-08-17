import http from './httpService';

const ADMIN = 'admin';

export const updateAdmin = (id, name, email, contactNo) => {
  return http.put(`/${ADMIN}`, {
    type: 'admin',
    id,
    name,
    email,
    contactNo,
  });
};

export const getAllAdmin = () => {
  return http.get(`/${ADMIN}`);
};

export const addAdmin = (name, email, contactNo, username) => {
  return http.post(`/${ADMIN}`, {
    personaUser: { username, password: '12345', role: 'ROLE_ADMIN' },
    person: { type: 'admin', name, email, contactNo },
  });
};

export const deleteAdmin = (id) => {
  return http.delete(`/${ADMIN}/${id}`);
};
