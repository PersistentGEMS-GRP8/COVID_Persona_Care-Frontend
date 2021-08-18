import http from './httpService';

class PatientVaccineService {

    createPatientVaccination(vaccination){
        return http.post('/patientVaccination', vaccination);
    }

}

export default new PatientVaccineService()
