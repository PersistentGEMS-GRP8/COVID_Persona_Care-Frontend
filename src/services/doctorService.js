import http from './httpService';

export const getDoctors = (hosId) => {
  return http.get('/doctors', { params: { hosId } });
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

export const addDoctor = (name, email, contactNo, specialization, username) => {
  return http.post(`/doctors/${specialization}`, {
    personaUser: { username, password: '12345', role: 'ROLE_DOCTOR' },
    person: { type: 'doctor', name, email, contactNo },
  });
};

export const addDoctorToHospital = (hospitalId, doctorId) => {
  return http.put(`/doctors/${hospitalId}/${doctorId}`);
};

export const deleteDoctorInHospital = (hospitalId, doctorId) => {
  return http.delete(`/doctors/${hospitalId}/${doctorId}`);
};
