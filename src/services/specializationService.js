import http from './httpService';

export const getAllSpecialization = () => {
  return http.get('/specializations');
};

export const getAllSpecializationWithDocCount = (name) => {
  return http.get('/specializations/doctor', { params: { name } });
};

export const addSpecialization = (name) => {
  return http.post('/specializations', {
    name,
  });
};

export const deleteSpecialization = (id) => {
  return http.delete(`/specializations/${id}`);
};

export const updateSpecialization = (id, name) => {
  return http.put('/specializations', {
    id,
    name,
  });
};
