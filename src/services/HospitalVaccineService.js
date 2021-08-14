import http from './httpService';

export const getVaccinesNames = () => {
  return http.get(`/vaccines`);
};

export const addVaccineToHospital =(count,hospitalId,vaccineId)=>{
  return http.post(`/vaccinesInHospital`,{
    count,hospitalId,vaccineId
  });
}
export const getVaccineInHospital = (id) => {
  return http.get(`/vaccine/${id}`);
};

export const deleteVaccineInHospital = (vaccineId) => {
    return http.delete(`/vaccine/1/${vaccineId}`);
  };