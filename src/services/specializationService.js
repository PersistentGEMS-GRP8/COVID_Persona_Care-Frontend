import http from './httpService';

export const getAllSpecialization = () => {
  return http.get('/specializations');
};
