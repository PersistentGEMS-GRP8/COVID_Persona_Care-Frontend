import http from './httpService';

export const getHospitalByName = (name) => {
  return http.get('/hospitals/search', { params: { name } });
};

export const getHospitalById = (id) => {
  return http.get(`/hospitals/${id}`);
};

export const updateHospitalBeds = (hId,beds)=>{
  return http.put(`/hospitals/manage_beds`,null,{params:{hId,beds}});
}