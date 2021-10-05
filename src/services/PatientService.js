// import axios from 'axios';
import http from './httpService';

// const PATIENT_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare";

class PatientService {

    getAllPatients(){
        return http.get('/patients');
    }

    getPatientByHId(hId){
        return http.get('/patients/getByHId/' + hId);
    }

    createPatient(patient){
        return http.post('/patients/add', patient);
    }

    getPatientById(patientId){
        return http.get('/patients/' + patientId);
    }

    updatePatient(patient){
        return http.put('/patients/', patient);
    }

    deletePatient(patientId){
        return http.delete('/patients/' + patientId);
    }
}

export default new PatientService()