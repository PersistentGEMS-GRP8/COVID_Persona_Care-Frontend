import http from './httpService';

export const getVaccinesNames = () => {
  return http.get(`/vaccines`);
};

export const addVaccineToHospital =({newVaccine})=>{
  return http.post(`/vaccinesInHospital`,newVaccine );
}
export const getVaccinesInHospital = (hId) => {
  return http.get(`/vaccinesInHospital/${hId}`);
};

export const getVaccineByIdAndHId = (id,hId) => {
  return http.get(`/vaccinesInHospital/getVaccine/${id}/${hId}`);
};

export const editVaccineInHospital =({editedVaccine})=>{
  return http.put(`/vaccinesInHospital`,editedVaccine );
}

export const deleteVaccineInHospital = (id) => {
    return http.delete(`/vaccinesInHospital/${id}`);
  };