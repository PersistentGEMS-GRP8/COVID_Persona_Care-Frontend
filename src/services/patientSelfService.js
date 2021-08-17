import http from './httpService';

const PATIENT_VACCINE = 'patientVaccination';

export const getVaccinationInfo = (userId) => {
  return http.get(`/${PATIENT_VACCINE}/${userId}`);
};

export const addVaccineData = (data) => {
  return http.post(`/${PATIENT_VACCINE}`, {
    ...data,
  });
};
