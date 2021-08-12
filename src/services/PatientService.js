import axios from 'axios';

const PATIENT_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/patients";

class PatientService {

    getPatientByHId(hId){
        return axios.get(PATIENT_API_BASE_URL + '/getByHId/' + hId);
    }

    createPatient(patient){
        return axios.post(PATIENT_API_BASE_URL + '/register', patient);
    }

    getPatientById(patientId){
        return axios.get(PATIENT_API_BASE_URL + '/' + patientId);
    }

    updatePatient(patient){
        return axios.put(PATIENT_API_BASE_URL, patient);
    }

    deletePatient(patientId){
        return axios.delete(PATIENT_API_BASE_URL + '/' + patientId);
    }
}

export default new PatientService()