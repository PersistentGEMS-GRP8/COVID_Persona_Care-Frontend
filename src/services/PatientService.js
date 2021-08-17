// import axios from 'axios';
import http from './httpService';

// const PATIENT_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/patients";

class PatientService {

    getAllPatients(){
        return http.get('/patients');
    }

    getPatientByHId(hId){
        return http.get('/patient/getByHId/' + hId);
    }

    createPatient(patient){
        return http.post('/patient/register', patient);
    }

    getPatientById(patientId){
        return http.get('/patient/' + patientId);
    }

    updatePatient(patient){
        return http.put('/patient/', patient);
    }

    deletePatient(patientId){
        return http.delete('/patient/' + patientId);
    }
}

export default new PatientService()