import http from './httpService';

export const getHospitalByName = (name) => {
  return http.get('/hospitals/search', { params: { name } });
};

export const getHospitalById = (id) => {
  return http.get(`/hospitals/${id}`);
};
