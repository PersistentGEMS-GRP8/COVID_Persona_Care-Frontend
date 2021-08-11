import http from './httpService';
import _ from 'lodash';

const doctorsArray = [
  {
    id: 1,
    name: 'Khosalan',
    email: 'khosalan@test.com',
    contactNo: '767854875',
    specialization: 'MBBS',
  },
  {
    id: 2,
    name: 'Ann',
    email: 'ann@test.com',
    contactNo: '767854875',
    specialization: 'MD',
  },
  {
    id: 3,
    name: 'Peter',
    email: 'peter@test.com',
    contactNo: '767854875',
    specialization: 'MBBS',
  },
];

export const getDoctors = () => {
  return doctorsArray;
};

export const getDoctorById = (id) => {
  const doctor = doctorsArray.find((doc) => doc.id == id);
  return _.isUndefined(doctor) ? false : doctor;
};

export const addDoctor = (doctor) => {
  doctorsArray.push(doctor);
};
