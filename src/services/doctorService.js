import http from './httpService';

export const getDoctors = () => {
  return http.get('/doctors', { params: { hosId: 1 } });
};

export const getDoctorById = (id) => {
  return http.get(`/doctors/${id}`);
};

export const getDoctorsByName = (name) => {
  return http.get('/doctors', {
    params: {
      name,
    },
  });
};

export const addDoctor = (name, email, contactNo, specialization) => {
  return http.post(`/doctors/${specialization}`, {
    name,
    email,
    contactNo,
  });
};

export const addDoctorToHospital = (doctorId) => {
  return http.put(`/doctors/1/${doctorId}`);
};

export const deleteDoctorInHospital = (doctorId) => {
  return http.delete(`/doctors/1/${doctorId}`);
};
